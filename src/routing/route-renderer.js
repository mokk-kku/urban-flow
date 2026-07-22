import { $ } from '../core/dom.js';
import { state, t } from '../core/app-state.js';
import { escapeHtml, formatDistance, formatFare, formatMinutes, getTransitIcon } from '../core/utils.js';
import { hideTransitOverviewMap } from '../maps/overview-layer.js';
import { updateMiniMapRoute } from '../maps/map-service.js';
import { summarizeRoute } from './route-summary.js';
import { getScore, preferenceLabel, preferenceValue } from './preferences.js';
import { saveRoute } from '../storage/favorites.js';

export function renderRouteCandidates(result) {
    const candidates = result.routes.map((route, index) => ({
        index,
        route,
        summary: summarizeRoute(route),
    }));

    candidates.sort((a, b) => getScore(a.summary) - getScore(b.summary));
    state.lastCandidates = candidates;
    state.selectedCandidateIndex = candidates[0]?.index ?? 0;

    if (state.directionsRenderer && candidates[0]) {
        hideTransitOverviewMap();
        state.directionsRenderer.setMap(state.map);
        state.directionsRenderer.setDirections(result);
        state.directionsRenderer.setRouteIndex(candidates[0].index);
        updateMiniMapRoute(result, candidates[0].index);
    }

    const warning = `<div class="api-status">${escapeHtml(t('routeWarning'))}</div>`;
    const cards = candidates.slice(0, 4).map((candidate, displayIndex) => buildRouteCard(candidate, displayIndex)).join('');
    $('results').className = '';
    $('results').innerHTML = warning + cards;

    document.querySelectorAll('.route-card').forEach((card) => {
        card.addEventListener('click', () => selectCandidate(Number(card.dataset.routeIndex)));
    });

    document.querySelectorAll('[data-action="save-route"]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            saveRoute(Number(event.currentTarget.dataset.routeIndex));
        });
    });

    document.querySelectorAll('[data-action="open-map"]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            selectCandidate(Number(event.currentTarget.dataset.routeIndex));
            document.querySelector('[data-target="page-map"]').click();
        });
    });
}

export function selectCandidate(routeIndex) {
    state.selectedCandidateIndex = routeIndex;
    if (state.directionsRenderer && state.lastDirectionsResult) {
        hideTransitOverviewMap();
        state.directionsRenderer.setMap(state.map);
        state.directionsRenderer.setDirections(state.lastDirectionsResult);
        state.directionsRenderer.setRouteIndex(routeIndex);
        updateMiniMapRoute(state.lastDirectionsResult, routeIndex);
    }

    document.querySelectorAll('.route-card').forEach((card) => {
        card.classList.toggle('selected', Number(card.dataset.routeIndex) === routeIndex);
    });
}

function buildRouteCard(candidate, displayIndex) {
    const { summary } = candidate;
    const selectedClass = candidate.index === state.selectedCandidateIndex ? 'selected' : '';
    const title = displayIndex === 0 ? `${t('recommended')} · ${preferenceLabel()}` : `${t('routeOption')} ${displayIndex + 1}`;
    const fareLabel = summary.fareSource === 'google' ? t('googleFare') : t('approx');
    const stepHtml = summary.steps.map(buildStepRow).join('');

    return `
        <div class="route-card ${selectedClass}" data-route-index="${candidate.index}">
            <div class="route-title">
                <b>${escapeHtml(title)}</b>
                <span class="badge"><i class="fa-solid fa-star"></i>${escapeHtml(preferenceValue(summary))}</span>
            </div>
            <div class="summary-grid">
                <div class="summary-item"><small>⏱️ ${t('time')}</small><strong>${formatMinutes(summary.durationSeconds)}</strong></div>
                <div class="summary-item"><small>📏 ${t('distance')}</small><strong>${formatDistance(summary.distanceMeters)}</strong></div>
                <div class="summary-item"><small>💰 ${t('fare')}</small><strong>${formatFare(summary.fareValue)}</strong></div>
                <div class="summary-item"><small>🚶 ${t('walk')}</small><strong>${formatDistance(summary.walkMeters)}</strong></div>
            </div>
            <div style="color:#888;font-size:11px;">${fareLabel} · ${t('transfers')}: ${summary.transfers}</div>
            <div class="step-list">${stepHtml}</div>
            <div class="card-actions">
                <button class="secondary-btn" data-action="save-route" data-route-index="${candidate.index}"><i class="fa-regular fa-heart"></i> ${t('save')}</button>
                <button class="secondary-btn" data-action="open-map" data-route-index="${candidate.index}"><i class="fa-solid fa-map-location-dot"></i> ${t('openMap')}</button>
            </div>
        </div>`;
}

function buildStepRow(step) {
    const icon = step.mode === 'WALKING' ? 'fa-person-walking' : getTransitIcon(step.vehicleType);
    const color = step.mode === 'WALKING' ? '#ffffff' : '#00e676';
    return `
        <div class="step-row">
            <i class="fa-solid ${icon}" style="color:${color}"></i>
            <div>
                <div class="step-line">${escapeHtml(step.title)}</div>
                <div class="step-meta">${formatDistance(step.distanceMeters)} · ${formatMinutes(step.durationSeconds)}</div>
            </div>
        </div>`;
}
