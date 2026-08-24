import { state } from '../core/app-state.js';
import { stripHtml } from '../core/utils.js';

export function summarizeRoute(route) {
    const summary = {
        durationSeconds: 0,
        distanceMeters: 0,
        walkMeters: 0,
        transitStepCount: 0,
        transfers: 0,
        fareValue: route.fare?.value ?? null, //ยึดราคาตามที่ Google ให้มา ถ้าไม่มีค่อยประเมินราคาเองข้างล่าง
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
 // คิดราคาโดยประมาณ (เดี๋ยวทำ Database เก็บราคาจริง)
export function estimateFare(route) {
    let total = 0;

    route.legs.forEach((leg) => {
        leg.steps.forEach((step) => {
            if (String(step.travel_mode || '').toUpperCase() !== 'TRANSIT' || !step.transit) return;

            const line = step.transit.line;
            const vehicleType = String(line?.vehicle?.type || '').toUpperCase();
            const agency = (line?.agencies || [])
                .map((item) => item.name || '')
                .join(' ')
                .toUpperCase();
            const lineName = `${line?.name || ''} ${line?.short_name || ''}`.toUpperCase();

            // รถเมล์กับเรือคิดราคาเหมาจ่าย
            if (isBusTransit(vehicleType, agency, lineName)) {
                total += 20;
                return;
            }

            if (isBoatTransit(vehicleType, agency, lineName)) {
                total += 20;
                return;
            }

            // สถานีแรก 17 บาท + สถานีละ 3 บาท แต่ไม่เกิน 44 บาท
            if (isRailTransit(vehicleType, agency, lineName)) {
                total += estimateRailFare(step.transit.num_stops);
                return;
            }

            // Fallback สำหรับ Transit ที่ Google ไม่ระบุประเภทชัดเจน
            // ถ้ามีจำนวนสถานี ให้ใช้กฎรถไฟฟ้า หรือใช้ราคาเหมาจ่าย 20 บาท
            const numStops = Number(step.transit.num_stops);
            total += Number.isFinite(numStops) && numStops > 0
                ? estimateRailFare(numStops)
                : 20;
        });
    });

    return total;
}

function estimateRailFare(numStops) {
    const stops = Math.max(1, Math.floor(Number(numStops) || 1));
    const fare = 17 + Math.max(0, stops - 1) * 3;
    return Math.min(44, fare);
}

function isBusTransit(vehicleType, agency, lineName) {
    return vehicleType.includes('BUS')
        || vehicleType.includes('TROLLEYBUS')
        || agency.includes('BMTA')
        || lineName.includes('BUS');
}

function isBoatTransit(vehicleType, agency, lineName) {
    return vehicleType.includes('FERRY')
        || vehicleType.includes('BOAT')
        || agency.includes('BOAT')
        || agency.includes('FERRY')
        || lineName.includes('BOAT')
        || lineName.includes('FERRY');
}

function isRailTransit(vehicleType, agency, lineName) {
    const railVehicleTypes = [
        'RAIL',
        'METRO_RAIL',
        'SUBWAY',
        'TRAM',
        'MONORAIL',
        'HEAVY_RAIL',
        'COMMUTER_TRAIN',
        'HIGH_SPEED_TRAIN',
        'LONG_DISTANCE_TRAIN',
        'TRAIN',
    ];

    return railVehicleTypes.some((type) => vehicleType.includes(type))
        || agency.includes('BTS')
        || agency.includes('MRT')
        || agency.includes('SRT')
        || agency.includes('SRTET')
        || lineName.includes('BTS')
        || lineName.includes('MRT')
        || lineName.includes('SUKHUMVIT')
        || lineName.includes('SILOM')
        || lineName.includes('AIRPORT RAIL LINK')
        || lineName.includes('ARL');
}
