import { $ } from '../core/dom.js';
import { state, t } from '../core/app-state.js';
import { escapeHtml, formatDistance, formatFare, formatMinutes } from '../core/utils.js';
import { preferenceLabel } from '../routing/preferences.js';

export function saveRoute(routeIndex) {
    const candidate = state.lastCandidates.find((c) => c.index === routeIndex);
    if (!candidate) return;

    const record = {
        id: Date.now(),
        origin: state.selectedOrigin?.name || $('originInput').value,
        destination: state.selectedDestination?.name || $('destinationInput').value,
        mode: preferenceLabel(),
        summary: {
            time: formatMinutes(candidate.summary.durationSeconds),
            distance: formatDistance(candidate.summary.distanceMeters),
            fare: formatFare(candidate.summary.fareValue),
            walk: formatDistance(candidate.summary.walkMeters),
        },
        savedAt: new Date().toISOString(),
    };

    const key = `urban_saved_routes_${state.userEmail}`;
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    saved.unshift(record);
    localStorage.setItem(key, JSON.stringify(saved.slice(0, 20)));
    renderFavorites();
    alert(t('saved'));
}

export function renderFavorites() {
    const key = `urban_saved_routes_${state.userEmail}`;
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (!saved.length) {
        $('favoritesList').innerHTML = `<div class="empty-state">${t('favoriteEmpty')}</div>`;
        return;
    }

    $('favoritesList').innerHTML = saved.map((item) => `
        <div class="favorite-card">
            <b>${escapeHtml(item.origin)} → ${escapeHtml(item.destination)}</b>
            <p>${escapeHtml(item.mode)} · ${item.summary.time} · ${item.summary.distance} · ${item.summary.fare} · 🚶 ${item.summary.walk}</p>
        </div>`).join('');
}
