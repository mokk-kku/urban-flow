import { t } from './app-state.js';

export function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

export function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

export function getTransitIcon(vehicleType = '') {
    const type = String(vehicleType).toUpperCase();
    if (type.includes('BUS')) return 'fa-bus';
    if (type.includes('FERRY') || type.includes('BOAT')) return 'fa-ship';
    if (type.includes('SUBWAY')) return 'fa-train-subway';
    if (type.includes('TRAIN') || type.includes('RAIL')) return 'fa-train';
    if (type.includes('TRAM')) return 'fa-train-tram';
    return 'fa-route';
}

export function formatMinutes(seconds) {
    return `${Math.round(seconds / 60)} ${t('min')}`;
}

export function formatDistance(meters) {
    if (meters >= 1000) return `${(meters / 1000).toFixed(1)} ${t('km')}`;
    return `${Math.round(meters)} ${t('m')}`;
}

export function formatFare(value) {
    return `${Math.round(value)} ${t('baht')}`;
}
