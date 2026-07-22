import { state } from '../core/app-state.js';
import { formatDistance, formatFare } from '../core/utils.js';

export function getScore(summary) {
    if (state.currentMode === 'cost') return summary.fareValue;
    if (state.currentMode === 'walk') return summary.walkMeters;
    return summary.distanceMeters;
}

export function preferenceLabel() {
    if (state.currentMode === 'cost') return state.currentLang === 'th' ? 'ถูกที่สุด' : 'Cheapest';
    if (state.currentMode === 'walk') return state.currentLang === 'th' ? 'เดินน้อยที่สุด' : 'Least walk';
    return state.currentLang === 'th' ? 'สั้นที่สุด' : 'Shortest';
}

export function preferenceValue(summary) {
    if (state.currentMode === 'cost') return formatFare(summary.fareValue);
    if (state.currentMode === 'walk') return formatDistance(summary.walkMeters);
    return formatDistance(summary.distanceMeters);
}
