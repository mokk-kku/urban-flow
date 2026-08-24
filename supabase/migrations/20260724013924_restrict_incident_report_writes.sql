-- CREATE INCIDENT REPORT

create or replace function public.create_incident_report(
    p_category_code text,
    p_title text,
    p_description text,
    p_place_name text,
    p_latitude double precision,
    p_longitude double precision,
    p_severity text default 'medium'
)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
    v_category_id smallint;
    v_report_id uuid;
    v_expiry_minutes integer;
begin

    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    if p_title is null
       or char_length(trim(p_title)) < 3 then
        raise exception
            'Title must contain at least 3 characters';
    end if;

    if p_latitude is null
       or p_latitude < -90
       or p_latitude > 90 then
        raise exception 'Invalid latitude';
    end if;

    if p_longitude is null
       or p_longitude < -180
       or p_longitude > 180 then
        raise exception 'Invalid longitude';
    end if;

    if p_latitude < 13.49
       or p_latitude > 13.96
       or p_longitude < 100.32
       or p_longitude > 100.95 then
        raise exception
            'Incident location must be inside Bangkok';
    end if;

    if p_severity is null
       or p_severity not in (
            'low',
            'medium',
            'high',
            'critical'
       ) then
        raise exception 'Invalid severity';
    end if;

    select
        id,
        default_expiry_minutes
    into
        v_category_id,
        v_expiry_minutes
    from public.report_categories
    where code = p_category_code
      and is_active = true;

    if v_category_id is null then
        raise exception 'Invalid report category';
    end if;

    insert into public.incident_reports (
        category_id,
        reported_by,
        title,
        description,
        place_name,
        location,
        severity,
        expires_at
    )
    values (
        v_category_id,

        auth.uid(),

        trim(p_title),

        nullif(
            trim(p_description),
            ''
        ),

        nullif(
            trim(p_place_name),
            ''
        ),

        extensions.st_setsrid(
            extensions.st_makepoint(
                p_longitude,
                p_latitude
            ),
            4326
        )::extensions.geography,

        p_severity,

        case
            when v_expiry_minutes is null then
                null
            else
                now()
                + make_interval(
                    mins => v_expiry_minutes
                )
        end
    )

    returning id
    into v_report_id;

    return v_report_id;
end;
$$;

-- Disable direct table writes

revoke insert, update, delete
on public.incident_reports
from authenticated;

-- UPDATE OWN PENDING REPORT

create or replace function public.get_my_incident_reports()
returns table (
    id uuid,
    category_code text,
    category_name_th text,
    category_name_en text,
    title varchar,
    description text,
    place_name varchar,
    severity varchar,
    status varchar,
    latitude double precision,
    longitude double precision,
    created_at timestamptz,
    updated_at timestamptz
)
language sql
security invoker
set search_path = public, extensions
as $$
    select
        ir.id,
        rc.code::text,
        rc.name_th::text,
        rc.name_en::text,
        ir.title,
        ir.description,
        ir.place_name,
        ir.severity,
        ir.status,

        extensions.st_y(
            ir.location::extensions.geometry
        ) as latitude,

        extensions.st_x(
            ir.location::extensions.geometry
        ) as longitude,

        ir.created_at,
        ir.updated_at

    from public.incident_reports ir

    left join public.report_categories rc
        on rc.id = ir.category_id

    where ir.reported_by = (select auth.uid())

    order by ir.created_at desc;
$$;

create or replace function public.update_my_pending_incident(
    p_report_id uuid,
    p_category_code text,
    p_title text,
    p_description text,
    p_place_name text,
    p_latitude double precision,
    p_longitude double precision,
    p_severity text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
    v_category_id smallint;
    v_default_expiry_minutes integer;
    v_created_at timestamptz;
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    if p_latitude is null
        or p_latitude < -90
        or p_latitude > 90 then
            raise exception 'Invalid latitude';
        end if;

    if p_longitude is null
        or p_longitude < -180
        or p_longitude > 180 then
            raise exception 'Invalid longitude';
    end if;

    -- supports in Bangkok only.
    if p_latitude < 13.49
    or p_latitude > 13.96
    or p_longitude < 100.32
    or p_longitude > 100.95 then
        raise exception
            'Incident location must be inside Bangkok';
    end if;

    if p_title is null
       or char_length(trim(p_title)) < 3 then
        raise exception
            'Title must contain at least 3 characters';
    end if;

    if p_severity is null
    or p_severity not in (
        'low',
        'medium',
        'high',
        'critical'
    ) then
        raise exception 'Invalid severity';
    end if;

    select
        id,
        default_expiry_minutes
    into
        v_category_id,
        v_default_expiry_minutes
    from public.report_categories
    where code = p_category_code
      and is_active = true;

    if v_category_id is null then
        raise exception 'Invalid report category';
    end if;

    select created_at
    into v_created_at
    from public.incident_reports
    where id = p_report_id
      and reported_by = auth.uid()
      and status = 'pending';

    if not found then
        raise exception
            'Report not found or report can no longer be edited';
    end if;

    update public.incident_reports
    set
        category_id = v_category_id,

        title = trim(p_title),

        description =
            nullif(trim(p_description), ''),

        place_name =
            nullif(trim(p_place_name), ''),

        location =
            extensions.st_setsrid(
                extensions.st_makepoint(
                    p_longitude,
                    p_latitude
                ),
                4326
            )::extensions.geography,

        severity = p_severity,

        expires_at =
            case
                when v_default_expiry_minutes is null
                    then null
                else
                    v_created_at
                    + make_interval(
                        mins =>
                            v_default_expiry_minutes
                    )
            end,

        updated_at = now()

    where id = p_report_id
      and reported_by = auth.uid()
      and status = 'pending';
end;
$$;

-- DELETE OWN PENDING REPORT

create or replace function public.delete_my_pending_incident(
    p_report_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    delete from public.incident_reports
    where id = p_report_id
      and reported_by = auth.uid()
      and status = 'pending';

    if not found then
        raise exception
            'Report not found or report can no longer be deleted';
    end if;
end;
$$;

-- RPC PERMISSIONS

revoke execute
on function public.create_incident_report(
    text,
    text,
    text,
    text,
    double precision,
    double precision,
    text
)
from public;

grant execute
on function public.create_incident_report(
    text,
    text,
    text,
    text,
    double precision,
    double precision,
    text
)
to authenticated;

revoke execute
on function public.update_my_pending_incident(
    uuid,
    text,
    text,
    text,
    text,
    double precision,
    double precision,
    text
)
from public;

grant execute
on function public.update_my_pending_incident(
    uuid,
    text,
    text,
    text,
    text,
    double precision,
    double precision,
    text
)
to authenticated;

revoke execute
on function public.delete_my_pending_incident(uuid)
from public;

grant execute
on function public.delete_my_pending_incident(uuid)
to authenticated;

revoke execute
on function public.get_my_incident_reports()
from public;

grant execute
on function public.get_my_incident_reports()
to authenticated;

-- Remove direct-write RLS policies

drop policy if exists
    "incident_reports_authenticated_insert"
on public.incident_reports;

drop policy if exists
    "incident_reports_owner_update_pending"
on public.incident_reports;

drop policy if exists
    "incident_reports_owner_delete_pending"
on public.incident_reports;