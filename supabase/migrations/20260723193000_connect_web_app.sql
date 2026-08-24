-- Set the original default
alter table public.saved_routes
    alter column route_preference set default 'shortest_distance';

-- Backfill profiles for Auth users that might have existed before the profile trigger was installed.
insert into public.profiles (id, display_name)
select
    u.id,
    coalesce(
        nullif(trim(u.raw_user_meta_data ->> 'display_name'), ''),
        split_part(u.email, '@', 1),
        'Urban Flow User'
    )
from auth.users u
where not exists (
    select 1
    from public.profiles p
    where p.id = u.id
);

-- Explicit Data API privileges. RLS policies still decide which rows are visible/writable.
grant usage on schema public to anon, authenticated;

grant select on table public.report_categories to anon, authenticated;
grant select on table public.incident_reports to anon, authenticated;
grant insert, update, delete on table public.incident_reports to authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.report_votes to authenticated;
grant select, insert, update, delete on table public.saved_routes to authenticated;
grant select, insert on table public.fare_change_requests to authenticated;

-- Save a route without forcing the browser to construct a PostGIS geography value.
create or replace function public.create_saved_route(
    p_route_name text,
    p_origin_place_id text,
    p_origin_name text,
    p_origin_latitude double precision,
    p_origin_longitude double precision,
    p_destination_place_id text,
    p_destination_name text,
    p_destination_latitude double precision,
    p_destination_longitude double precision,
    p_route_preference text
)
returns uuid
language plpgsql
security invoker
set search_path = public, extensions
as $$
declare
    v_route_id uuid;
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    if char_length(trim(coalesce(p_route_name, ''))) < 1 then
        raise exception 'Route name is required';
    end if;

    if char_length(trim(coalesce(p_origin_name, ''))) < 1
       or char_length(trim(coalesce(p_destination_name, ''))) < 1 then
        raise exception 'Origin and destination names are required';
    end if;

    if p_origin_latitude is null
       or p_destination_latitude is null
       or p_origin_latitude not between -90 and 90
       or p_destination_latitude not between -90 and 90 then
        raise exception 'Invalid latitude';
    end if;

    if p_origin_longitude is null
       or p_destination_longitude is null
       or p_origin_longitude not between -180 and 180
       or p_destination_longitude not between -180 and 180 then
        raise exception 'Invalid longitude';
    end if;

    if p_route_preference is null
       or p_route_preference not in (
        'shortest_distance',
        'cheapest',
        'least_walking',
        'least_time'
    ) then
        raise exception 'Invalid route preference';
    end if;

    insert into public.saved_routes (
        user_id,
        route_name,
        origin_place_id,
        origin_name,
        origin_location,
        destination_place_id,
        destination_name,
        destination_location,
        route_preference
    )
    values (
        auth.uid(),
        left(trim(p_route_name), 150),
        nullif(trim(p_origin_place_id), ''),
        trim(p_origin_name),
        extensions.st_setsrid(
            extensions.st_makepoint(p_origin_longitude, p_origin_latitude),
            4326
        )::extensions.geography,
        nullif(trim(p_destination_place_id), ''),
        trim(p_destination_name),
        extensions.st_setsrid(
            extensions.st_makepoint(p_destination_longitude, p_destination_latitude),
            4326
        )::extensions.geography,
        p_route_preference
    )
    returning id into v_route_id;

    return v_route_id;
end;
$$;

-- Return saved-route coordinates in browser-friendly numeric columns.
create or replace function public.get_my_saved_routes()
returns table (
    id uuid,
    route_name varchar,
    origin_place_id varchar,
    origin_name varchar,
    origin_latitude double precision,
    origin_longitude double precision,
    destination_place_id varchar,
    destination_name varchar,
    destination_latitude double precision,
    destination_longitude double precision,
    route_preference varchar,
    created_at timestamptz,
    last_used_at timestamptz
)
language sql
security invoker
set search_path = public, extensions
as $$
    select
        sr.id,
        sr.route_name,
        sr.origin_place_id,
        sr.origin_name,
        extensions.st_y(sr.origin_location::extensions.geometry) as origin_latitude,
        extensions.st_x(sr.origin_location::extensions.geometry) as origin_longitude,
        sr.destination_place_id,
        sr.destination_name,
        extensions.st_y(sr.destination_location::extensions.geometry) as destination_latitude,
        extensions.st_x(sr.destination_location::extensions.geometry) as destination_longitude,
        sr.route_preference,
        sr.created_at,
        sr.last_used_at
    from public.saved_routes sr
    where sr.user_id = auth.uid()
    order by sr.created_at desc;
$$;

revoke execute on function public.create_saved_route(
    text, text, text, double precision, double precision,
    text, text, double precision, double precision, text
) from public;
grant execute on function public.create_saved_route(
    text, text, text, double precision, double precision,
    text, text, double precision, double precision, text
) to authenticated;

revoke execute on function public.get_my_saved_routes() from public;
grant execute on function public.get_my_saved_routes() to authenticated;

revoke execute on function public.create_incident_report(
    text, text, text, text, double precision, double precision, text
) from public;
grant execute on function public.create_incident_report(
    text, text, text, text, double precision, double precision, text
) to authenticated;

-- Optional evidence files for fare-change requests.
-- A private bucket keeps evidence out of public URLs; access is controlled by storage.objects RLS.
insert into storage.buckets (
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
)
values (
    'fare-evidence',
    'fare-evidence',
    false,
    6291456,
    array[
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf'
    ]
)
on conflict (id) do update
set
    public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "fare_evidence_insert_own"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'fare-evidence'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- Storage returns metadata after upload, so the uploader also needs SELECT access to their file.
create policy "fare_evidence_select_own"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'fare-evidence'
    and owner_id = (select auth.uid()::text)
);

create policy "fare_evidence_delete_own"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'fare-evidence'
    and owner_id = (select auth.uid()::text)
);
