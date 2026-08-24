import { state } from '../core/app-state.js';
import { formatDistance, formatFare, formatMinutes } from '../core/utils.js';

export function getScore(summary) {
    if (state.currentMode === 'cost') return summary.fareValue;
    if (state.currentMode === 'walk') return summary.walkMeters;
    if (state.currentMode === 'time') return summary.durationSeconds;
    return summary.distanceMeters;
}

export function preferenceCode() {
    if (state.currentMode === 'cost') return 'cheapest';
    if (state.currentMode === 'walk') return 'least_walking';
    if (state.currentMode === 'time') return 'least_time';
    return 'shortest_distance';
}

export function modeFromPreferenceCode(code) {
    if (code === 'cheapest') return 'cost';
    if (code === 'least_walking') return 'walk';
    if (code === 'least_time') return 'time';
    return 'distance';
}

export function preferenceLabel(code = preferenceCode()) {
    const th = state.currentLang === 'th';
    if (code === 'cheapest') return th ? 'ถูกที่สุด' : 'Cheapest';
    if (code === 'least_walking') return th ? 'เดินน้อยที่สุด' : 'Least walking';
    if (code === 'least_time') return th ? 'ใช้เวลาน้อยที่สุด' : 'Least time';
    return th ? 'ระยะทางสั้นที่สุด' : 'Shortest distance';
}

export function preferenceValue(summary) {
    if (state.currentMode === 'cost') return formatFare(summary.fareValue);
    if (state.currentMode === 'walk') return formatDistance(summary.walkMeters);
    if (state.currentMode === 'time') return formatMinutes(summary.durationSeconds);
    return formatDistance(summary.distanceMeters);
}
