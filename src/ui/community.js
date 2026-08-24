import { $ } from '../core/dom.js';
import { BANGKOK_SOFT_BOUNDS, state, t } from '../core/app-state.js';
import { escapeHtml } from '../core/utils.js';
import { supabase } from '../supabase-client.js';

import {
    ENABLE_FARE_CHANGE_REQUESTS
} from '../config.js';

function tr(th, en) {
    return state.currentLang === 'th' ? th : en;
}

function latLngValue(location, key) {
    if (!location) return null;
    const value = location[key];
    return typeof value === 'function' ? value.call(location) : value;
}

function setFormStatus(id, message = '', type = '') {
    const box = $(id);
    if (!box) return;
    box.textContent = message;
    box.className = 'form-status';
    if (!message) {
        box.classList.add('hidden');
        return;
    }
    box.classList.add(type === 'success' ? 'success' : 'error');
}

export function setupCommunity() {
    $('incidentReportForm')?.addEventListener('submit', submitIncidentReport);

    if (ENABLE_FARE_CHANGE_REQUESTS) { $('fareChangeForm')?.addEventListener('submit', submitFareChangeRequest); }
    const fareTab = document.querySelector( '[data-community-tab="fare"]' );
    const farePanel = $('fareChangePanel');
    if (!ENABLE_FARE_CHANGE_REQUESTS) {
        fareTab?.classList.add('hidden');
        farePanel?.classList.add('hidden');
    }

    $('cancelIncidentEditBtn')?.addEventListener('click', cancelIncidentEdit);
    $('myIncidentReports')?.addEventListener('click', handleIncidentHistoryClick);
    $('useRouteOriginForIncident')?.addEventListener('click', useRouteOriginForIncident);
    document.querySelectorAll('[data-community-tab]').forEach((button) => {
        button.addEventListener('click', () => switchCommunityTab(button.dataset.communityTab));
    });

    loadReportCategories();
    refreshCommunityHistory();
}

export async function refreshCommunityHistory() {
    await Promise.all([
        renderMyIncidentReports(),
        renderMyFareRequests(),
    ]);
}

async function loadReportCategories() {
    if (!supabase) return;
    const { data, error } = await supabase
        .from('report_categories')
        .select('code, name_th, name_en, default_expiry_minutes')
        .eq('is_active', true)
        .order('id');

    if (error) {
        console.error('Could not load report categories:', error);
        return;
    }

    state.reportCategories = data || [];
    renderCategoryOptions();
}

export function renderCategoryOptions() {
    const select = $('incidentCategory');
    if (!select) return;
    const previous = select.value;
    select.innerHTML = state.reportCategories.map((category) => {
        const label = state.currentLang === 'th' ? category.name_th : category.name_en;
        return `<option value="${escapeHtml(category.code)}">${escapeHtml(label)}</option>`;
    }).join('');
    if (previous && state.reportCategories.some((item) => item.code === previous)) select.value = previous;
}

async function submitIncidentReport(event) {
    event.preventDefault();
    setFormStatus('incidentFormStatus');

    if (!supabase || !state.currentUser) {
        setFormStatus(
            'incidentFormStatus',
            t('loginRequired')
        );
        return;
    }

    if (!state.selectedIncidentLocation?.location) {
        setFormStatus(
            'incidentFormStatus',
            tr(
                'กรุณาเลือกสถานที่จากรายการแนะนำของ Google Maps',
                'Select the incident location from Google Maps suggestions.'
            )
        );
        return;
    }

    const latitude = Number(
        latLngValue(
            state.selectedIncidentLocation.location,
            'lat'
        )
    );

    const longitude = Number(
        latLngValue(
            state.selectedIncidentLocation.location,
            'lng'
        )
    );

    if (!isInsideBangkok(latitude, longitude)) {
        setFormStatus(
            'incidentFormStatus',
            tr(
                'ตำแหน่งเหตุการณ์ต้องอยู่ในพื้นที่กรุงเทพมหานคร',
                'The incident location must be inside Bangkok.'
            )
        );
        return;
    }

    const submitButton = $('submitIncidentBtn');

    if (!submitButton) return;

    submitButton.disabled = true;

    const title =
        $('incidentTitle').value.trim();

    const description =
        $('incidentDescription').value.trim();

    const categoryCode =
        $('incidentCategory').value;

    const severity =
        $('incidentSeverity').value;

    const placeName =
        state.selectedIncidentLocation.address
        || state.selectedIncidentLocation.name
        || $('incidentLocationInput').value.trim();

    const wasEditing =
        Boolean(state.editingIncidentId);

    try {
        let result;

        if (wasEditing) {
            result = await supabase.rpc(
                'update_my_pending_incident',
                {
                    p_report_id:
                        state.editingIncidentId,

                    p_category_code:
                        categoryCode,

                    p_title:
                        title,

                    p_description:
                        description || null,

                    p_place_name:
                        placeName,

                    p_latitude:
                        latitude,

                    p_longitude:
                        longitude,

                    p_severity:
                        severity,
                }
            );
        } else {
            result = await supabase.rpc(
                'create_incident_report',
                {
                    p_category_code:
                        categoryCode,

                    p_title:
                        title,

                    p_description:
                        description || null,

                    p_place_name:
                        placeName,

                    p_latitude:
                        latitude,

                    p_longitude:
                        longitude,

                    p_severity:
                        severity,
                }
            );
        }

        if (result.error) {
            throw result.error;
        }

        resetIncidentForm();

        setFormStatus(
            'incidentFormStatus',
            wasEditing
                ? tr(
                    'แก้ไขรายงานเรียบร้อยแล้ว',
                    'Incident report updated.'
                )
                : t('reportSaved'),
            'success'
        );

        await renderMyIncidentReports();

    } catch (error) {
        console.error(error);

        setFormStatus(
            'incidentFormStatus',
            error?.message
            || tr(
                'ไม่สามารถบันทึกรายงานได้',
                'Could not save report.'
            )
        );

    } finally {
        submitButton.disabled = false;
    }
}

function resetIncidentForm() {
    $('incidentReportForm')?.reset();

    state.editingIncidentId = null;
    state.selectedIncidentLocation = null;

    renderCategoryOptions();

    const submitText = $('incidentSubmitText');

    if (submitText) { submitText.textContent =
        tr(
            'ส่งรายงานเหตุการณ์',
            'Submit incident report'
        );
    }

    $('cancelIncidentEditBtn')
        ?.classList.add('hidden');
}

function useRouteOriginForIncident() {
    if (!state.selectedOrigin?.location) {
        setFormStatus('incidentFormStatus', tr(
            'กรุณาเลือกต้นทางในหน้าค้นหาเส้นทางก่อน',
            'Select an origin on the route page first.'
        ));
        return;
    }

    state.selectedIncidentLocation = {
        ...state.selectedOrigin,
        location: state.selectedOrigin.location,
    };
    $('incidentLocationInput').value = state.selectedOrigin.address || state.selectedOrigin.name;
    setFormStatus('incidentFormStatus', tr('ใช้ตำแหน่งต้นทางแล้ว', 'Route origin selected.'), 'success');
}

async function submitFareChangeRequest(event) {
    event.preventDefault();

    if (!ENABLE_FARE_CHANGE_REQUESTS) {
        setFormStatus(
            'fareFormStatus',
            tr(
                'ระบบแจ้งเปลี่ยนค่าโดยสารถูกปิดใช้งานชั่วคราว',
                'Fare change requests are temporarily unavailable.'
            )
        );

        return;
    }
    
    setFormStatus('fareFormStatus');

    if (!supabase || !state.currentUser) {
        setFormStatus('fareFormStatus', t('loginRequired'));
        return;
    }

    const submitButton = $('submitFareBtn');
    submitButton.disabled = true;

    const oldFareRaw = $('fareOld').value;
    const effectiveDate = $('fareEffectiveDate').value;
    const transportLine = $('fareTransportLine').value.trim();
    const description = $('fareDescription').value.trim();
    const sourceUrl = $('fareSourceUrl').value.trim();

    const evidenceFile = $('fareEvidence').files?.[0] || null;
    let evidencePath = null;

    const payload = {
        submitted_by: state.currentUser.id,
        operator_name: $('fareOperatorName').value.trim(),
        transport_mode: $('fareTransportMode').value,
        transport_line: transportLine || null,
        old_fare: oldFareRaw === '' ? null : Number(oldFareRaw),
        proposed_fare: Number($('fareProposed').value),
        effective_date: effectiveDate || null,
        description: description || null,
        source_url: sourceUrl || null,
        evidence_storage_path: null,
        status: 'pending',
    };

    try {
        if (evidenceFile) {
            evidencePath = await uploadFareEvidence(evidenceFile);
            payload.evidence_storage_path = evidencePath;
        }

        const { error } = await supabase.from('fare_change_requests').insert(payload);
        if (error) throw error;

        $('fareChangeForm').reset();
        setFormStatus('fareFormStatus', t('fareRequestSaved'), 'success');
        await renderMyFareRequests();
    } catch (error) {
        console.error(error);
        if (evidencePath) {
            const { error: cleanupError } = await supabase.storage.from('fare-evidence').remove([evidencePath]);
            if (cleanupError) console.error('Could not remove orphan evidence:', cleanupError);
        }
        setFormStatus('fareFormStatus', error?.message || tr('ไม่สามารถส่งคำร้องได้', 'Could not submit fare request.'));
    } finally {
        submitButton.disabled = false;
    }
}

async function uploadFareEvidence(file) {
    const allowedTypes = new Set([
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
    ]);

    if (!allowedTypes.has(file.type)) {
        throw new Error(tr('ชนิดไฟล์หลักฐานไม่รองรับ', 'Unsupported evidence file type.'));
    }
    if (file.size > 6 * 1024 * 1024) {
        throw new Error(tr('ไฟล์หลักฐานต้องมีขนาดไม่เกิน 6 MB', 'Evidence file must be 6 MB or smaller.'));
    }

    const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'bin';
    const path = `${state.currentUser.id}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage
        .from('fare-evidence')
        .upload(path, file, {
            cacheControl: '3600',
            contentType: file.type,
            upsert: false,
        });

    if (error) throw error;
    return path;
}

async function renderMyIncidentReports() {
    const container = $('myIncidentReports');
    if (!container || !supabase || !state.currentUser) return;

    const { data, error } =
    await supabase.rpc(
        'get_my_incident_reports'
    );

    if (error) {
        console.error(error);
        container.innerHTML = `<div class="empty-state">${escapeHtml(tr('โหลดรายงานไม่สำเร็จ', 'Could not load reports.'))}</div>`;
        return;
    }

    state.myIncidentReports =
    data || [];

    if (!state.myIncidentReports.length) {
        container.innerHTML = `
            <div class="empty-state">
                ${escapeHtml(
                    tr(
                        'ยังไม่มีรายงานเหตุการณ์',
                        'No incident reports yet.'
                    )
                )}
            </div>
        `;
        return;
    }

    container.innerHTML =
        state.myIncidentReports
            .map(renderIncidentCard)
            .join('');
}

function renderIncidentCard(item) {
    const categoryName =
        state.currentLang === 'th'
            ? item.category_name_th
            : item.category_name_en;

    const canModify =
        item.status === 'pending';

    return `
        <div class="submission-card" data-report-id="${escapeHtml(item.id)}">
            <div class="submission-heading">
                <b>${escapeHtml(item.title)}</b>
                <span class="status-pill status-${escapeHtml(item.status)}">
                    ${escapeHtml(incidentStatusLabel(item.status))}
                </span>
            </div>
            <p>
                ${escapeHtml(categoryName || '-')}
                ·
                ${escapeHtml(incidentSeverityLabel(item.severity))}
                ·
                ${escapeHtml(item.place_name || '-')}
            </p>
            ${
                item.description
                    ? `
                        <p>
                            ${escapeHtml(item.description)}
                        </p>
                    `
                    : ''
            }

            <small>
                ${escapeHtml(formatDate(item.created_at))}
            </small>

            ${
                canModify
                    ? `
                        <div class="submission-actions">
                            <button type="button" class="secondary-btn" data-action="edit-incident" data-report-id="${escapeHtml(item.id)}">
                                <i class="fa-solid fa-pen"></i>
                                    ${escapeHtml(
                                        tr(
                                            'แก้ไข',
                                            'Edit'
                                        )
                                    )}
                            </button>
                            <button type="button" class="secondary-btn danger-outline" data-action="delete-incident" data-report-id="${escapeHtml(item.id)}">
                                <i class="fa-solid fa-trash"></i>
                                    ${escapeHtml(
                                        tr(
                                            'ลบ',
                                            'Delete'
                                        )
                                    )}
                            </button>
                        </div>
                    `
                    : ''
            }
        </div>
    `;
}

function handleIncidentHistoryClick(event) {
    const button =
        event.target.closest(
            '[data-action]'
        );

    if (!button) return;

    const reportId = button.dataset.reportId;

    if (!reportId) return;

    switch (button.dataset.action) {
        case 'edit-incident':
            startIncidentEdit(reportId);
            break;

        case 'delete-incident':
            deleteIncidentReport(reportId);
            break;

        default:
            break;
    }
}

function startIncidentEdit(reportId) {
    const report =
        state.myIncidentReports.find(
            (item) => item.id === reportId
        );

    if (!report) { return; }

    if (report.status !== 'pending') {
        setFormStatus(
            'incidentFormStatus',
            tr(
                'รายงานนี้ไม่สามารถแก้ไขได้แล้ว',
                'This report can no longer be edited.'
            )
        );

        return;
    }

    state.editingIncidentId = report.id;

    $('incidentCategory').value = report.category_code;

    $('incidentSeverity').value = report.severity;

    $('incidentTitle').value = report.title || '';

    $('incidentDescription').value = report.description || '';

    $('incidentLocationInput').value = report.place_name || '';

    state.selectedIncidentLocation = {
        name:
            report.place_name || '',

        address:
            report.place_name || '',

        location: {
            lat: () =>
                Number(report.latitude),

            lng: () =>
                Number(report.longitude),
        },
    };

    const submitText = $('incidentSubmitText');

    if (submitText) {
        submitText.textContent =
            tr(
                'บันทึกการแก้ไข',
                'Save changes'
            );
    }

    $('cancelIncidentEditBtn')
        ?.classList.remove('hidden');

    $('incidentReportForm')
        ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

    setFormStatus(
        'incidentFormStatus',
        tr(
            'กำลังแก้ไขรายงาน',
            'Editing incident report.'
        ),
        'success'
    );
}

function cancelIncidentEdit() {
    resetIncidentForm();

    setFormStatus(
        'incidentFormStatus'
    );
}

async function deleteIncidentReport(
    reportId
) {
    const report =
        state.myIncidentReports.find(
            (item) => item.id === reportId
        );

    if (!report) return;

    if (report.status !== 'pending') {
        setFormStatus(
            'incidentFormStatus',
            tr(
                'ลบได้เฉพาะรายงานที่รอตรวจสอบ',
                'Only pending reports can be deleted.'
            )
        );

        return;
    }

    const confirmed =
        window.confirm(
            tr(
                `ต้องการลบรายงาน "${report.title}" หรือไม่?`,
                `Delete report "${report.title}"?`
            )
        );

    if (!confirmed) return;

    try {
        const { error } =
            await supabase.rpc(
                'delete_my_pending_incident',
                {
                    p_report_id:
                        reportId,
                }
            );

        if (error) {
            throw error;
        }

        if (
            state.editingIncidentId
            === reportId
        ) {
            resetIncidentForm();
        }

        setFormStatus(
            'incidentFormStatus',
            tr(
                'ลบรายงานเรียบร้อยแล้ว',
                'Incident report deleted.'
            ),
            'success'
        );

        await renderMyIncidentReports();

    } catch (error) {
        console.error(error);

        setFormStatus(
            'incidentFormStatus',
            error?.message ||
                tr(
                    'ไม่สามารถลบรายงานได้',
                    'Could not delete report.'
                )
        );
    }
}

function incidentStatusLabel(status) {
    const labels = {
        pending: {
            th: 'รอตรวจสอบ',
            en: 'Pending',
        },
        verified: {
            th: 'ยืนยันแล้ว',
            en: 'Verified',
        },
        rejected: {
            th: 'ปฏิเสธ',
            en: 'Rejected',
        },
        resolved: {
            th: 'สิ้นสุดแล้ว',
            en: 'Resolved',
        },
        expired: {
            th: 'หมดอายุ',
            en: 'Expired',
        },
    };

    return labels[status]?.[state.currentLang]
        || status;
}

function incidentSeverityLabel(severity) {
    const labels = {
        low: {
            th: 'ต่ำ',
            en: 'Low',
        },
        medium: {
            th: 'ปานกลาง',
            en: 'Medium',
        },
        high: {
            th: 'สูง',
            en: 'High',
        },
        critical: {
            th: 'วิกฤต',
            en: 'Critical',
        },
    };

    return labels[severity]?.[state.currentLang]
        || severity;
}

async function renderMyFareRequests() {
    const container = $('myFareRequests');
    if (!container || !supabase || !state.currentUser) return;

    const { data, error } = await supabase
        .from('fare_change_requests')
        .select('id, operator_name, transport_mode, transport_line, old_fare, proposed_fare, status, review_note, created_at')
        .eq('submitted_by', state.currentUser.id)
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error(error);
        container.innerHTML = `<div class="empty-state">${escapeHtml(tr('โหลดคำร้องไม่สำเร็จ', 'Could not load fare requests.'))}</div>`;
        return;
    }

    if (!data?.length) {
        container.innerHTML = `<div class="empty-state">${escapeHtml(tr('ยังไม่มีคำร้องเปลี่ยนค่าโดยสาร', 'No fare change requests yet.'))}</div>`;
        return;
    }

    container.innerHTML = data.map((item) => `
        <div class="submission-card">
            <div class="submission-heading">
                <b>${escapeHtml(item.operator_name)}${item.transport_line ? ` · ${escapeHtml(item.transport_line)}` : ''}</b>
                <span class="status-pill status-${escapeHtml(item.status)}">${escapeHtml(item.status)}</span>
            </div>
            <p>${escapeHtml(item.transport_mode.toUpperCase())} · ${item.old_fare == null ? '-' : Number(item.old_fare).toFixed(2)} → ${Number(item.proposed_fare).toFixed(2)} THB</p>
            ${item.review_note ? `<p class="review-note">${escapeHtml(item.review_note)}</p>` : ''}
            <small>${escapeHtml(formatDate(item.created_at))}</small>
        </div>`).join('');
}

function switchCommunityTab(tab) {
    document.querySelectorAll('[data-community-tab]').forEach((button) => {
        button.classList.toggle('active', button.dataset.communityTab === tab);
    });
    document.querySelectorAll('[data-community-panel]').forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.communityPanel === tab);
    });
}

function isInsideBangkok(latitude, longitude) {
    return latitude >= BANGKOK_SOFT_BOUNDS.south
        && latitude <= BANGKOK_SOFT_BOUNDS.north
        && longitude >= BANGKOK_SOFT_BOUNDS.west
        && longitude <= BANGKOK_SOFT_BOUNDS.east;
}

function formatDate(value) {
    if (!value) return '-';
    return new Intl.DateTimeFormat(state.currentLang === 'th' ? 'th-TH' : 'en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}
