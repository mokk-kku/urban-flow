import { state } from '../core/app-state.js';
import { stripHtml } from '../core/utils.js';

export function summarizeRoute(route) {
    const summary = {
        durationSeconds: 0,
        distanceMeters: 0,
        walkMeters: 0,
        transitStepCount: 0,
        transfers: 0,
        fareValue: route.fare?.value ?? null,
        fareSource: route.fare ? 'google' : 'estimated',
        steps: [],
    };

    route.legs.forEach((leg) => {
        summary.durationSeconds += leg.duration?.value || 0;
        summary.distanceMeters += leg.distance?.value || 0;

        leg.steps.forEach((step) => {
            const mode = String(step.travel_mode || '').toUpperCase();
            const distanceMeters = step.distance?.value || 0;
            const durationSeconds = step.duration?.value || 0;
            if (mode === 'WALKING') summary.walkMeters += distanceMeters;
            if (mode === 'TRANSIT') summary.transitStepCount += 1;

            summary.steps.push(toDisplayStep(step, mode, distanceMeters, durationSeconds));
        });
    });

    summary.transfers = Math.max(0, summary.transitStepCount - 1);
    if (summary.fareValue === null) summary.fareValue = estimateFare(route);
    return summary;
}

function toDisplayStep(step, mode, distanceMeters, durationSeconds) {
    if (mode === 'TRANSIT' && step.transit) {
        const line = step.transit.line;
        const vehicleType = line?.vehicle?.type || 'TRANSIT';
        const lineName = line?.short_name || line?.name || vehicleType;
        const dep = step.transit.departure_stop?.name || '';
        const arr = step.transit.arrival_stop?.name || '';
        return {
            mode,
            vehicleType,
            title: `${lineName}: ${dep} → ${arr}`,
            distanceMeters,
            durationSeconds,
        };
    }

    return {
        mode: 'WALKING',
        vehicleType: 'WALKING',
        title: stripHtml(step.instructions || (state.currentLang === 'th' ? 'เดินเท้า' : 'Walk')),
        distanceMeters,
        durationSeconds,
    };
}

export function estimateFare(route) {
    let total = 0;
    route.legs.forEach((leg) => {
        leg.steps.forEach((step) => {
            if (String(step.travel_mode).toUpperCase() !== 'TRANSIT' || !step.transit) return;
            const line = step.transit.line;
            const vehicleType = String(line?.vehicle?.type || '').toUpperCase();
            const agency = (line?.agencies || []).map((a) => a.name).join(' ').toUpperCase();
            const name = `${line?.name || ''} ${line?.short_name || ''}`.toUpperCase();

            if (vehicleType.includes('BUS') || agency.includes('BMTA')) total += 15;
            else if (agency.includes('BTS') || name.includes('BTS') || name.includes('SUKHUMVIT') || name.includes('SILOM')) total += 47;
            else if (agency.includes('MRT') || name.includes('MRT')) total += 43;
            else if (name.includes('AIRPORT') || name.includes('ARL') || agency.includes('SRTET')) total += 45;
            else if (vehicleType.includes('SUBWAY') || vehicleType.includes('RAIL') || vehicleType.includes('TRAIN')) total += 40;
            else total += 25;
        });
    });
    return total;
}
