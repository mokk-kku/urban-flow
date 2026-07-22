import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../config.js';
import { state, RAIL_STATION_COUNT, RAIL_EDGE_COUNT, BUS_STOP_COUNT, BOAT_PIER_COUNT } from '../core/app-state.js';
import { $ } from '../core/dom.js';
import { escapeHtml } from '../core/utils.js';
import {
    OVERVIEW_LINE_STYLES,
    RAIL_STATIONS,
    RAIL_EDGES,
    BUS_CORRIDORS,
    BOAT_ROUTES,
} from '../transit-overview-data.js';

export function initTransitOverviewLayers() {
    state.transitOverviewLayer = new google.maps.TransitLayer();
    state.overviewLayerGroups = { rail: [], bus: [], boat: [] };
    state.overviewBounds = new google.maps.LatLngBounds();
    state.overviewInfoWindow = new google.maps.InfoWindow({ maxWidth: 260 });

    addRailOverviewLayer();
    addBusOverviewLayer();
    addBoatOverviewLayer();
}

function addRailOverviewLayer() {
    const stationById = new Map(RAIL_STATIONS.map((station) => [station.id, station]));

    RAIL_EDGES.forEach((edge) => {
        const from = stationById.get(edge.from);
        const to = stationById.get(edge.to);
        if (!from || !to) return;

        const path = [toLatLng(from), toLatLng(to)];
        path.forEach((point) => state.overviewBounds.extend(point));
        state.overviewLayerGroups.rail.push(createOverviewPolyline({
            path,
            line: edge.line,
            title: `${getDisplayName(from)} → ${getDisplayName(to)}`,
            zIndex: edge.line === 'TRANSFER' ? 13 : 16,
        }));
    });

    RAIL_STATIONS.forEach((station) => {
        const position = toLatLng(station);
        state.overviewBounds.extend(position);
        state.overviewLayerGroups.rail.push(createOverviewMarker({
            position,
            title: `${getDisplayName(station)} · ${station.line}`,
            color: getOverviewStyle(station.line).color,
            size: 13,
            zIndex: 40,
            html: `<b>${escapeHtml(getDisplayName(station))}</b><br><span>${escapeHtml(station.line)}</span>`,
        }));
    });
}

function addBusOverviewLayer() {
    BUS_CORRIDORS.forEach((corridor) => {
        const path = corridor.stops.map(toLatLng);
        path.forEach((point) => state.overviewBounds.extend(point));
        state.overviewLayerGroups.bus.push(createOverviewPolyline({
            path,
            line: 'bus',
            title: state.currentLang === 'th' ? corridor.name_th : corridor.name,
            zIndex: 12,
        }));

        corridor.stops.forEach((stop) => {
            state.overviewLayerGroups.bus.push(createOverviewMarker({
                position: toLatLng(stop),
                title: state.currentLang === 'th' ? `${stop.name_th} · Bus` : `${stop.name_en} · Bus`,
                color: getOverviewStyle('bus').color,
                size: 10,
                zIndex: 32,
                html: `<b>${escapeHtml(state.currentLang === 'th' ? stop.name_th : stop.name_en)}</b><br><span>${state.currentLang === 'th' ? 'จุดอ้างอิงแนวรถเมล์' : 'Bus corridor reference point'}</span>`,
            }));
        });
    });
}

function addBoatOverviewLayer() {
    BOAT_ROUTES.forEach((route) => {
        const path = route.piers.map(toLatLng);
        path.forEach((point) => state.overviewBounds.extend(point));
        state.overviewLayerGroups.boat.push(createOverviewPolyline({
            path,
            line: 'boat',
            title: state.currentLang === 'th' ? route.name_th : route.name,
            zIndex: 14,
        }));

        route.piers.forEach((pier) => {
            state.overviewLayerGroups.boat.push(createOverviewMarker({
                position: toLatLng(pier),
                title: `${pier.name} · Boat`,
                color: getOverviewStyle('boat').color,
                size: 11,
                zIndex: 34,
                html: `<b>${escapeHtml(pier.name)}</b><br><span>${state.currentLang === 'th' ? 'ท่าเรือโดยสาร' : 'Passenger boat pier'}</span>`,
            }));
        });
    });
}

export function showTransitOverviewMap(recenter = false) {
    if (!state.mapsReady || !state.map) return;

    state.isOverviewMode = true;
    if (state.directionsRenderer) state.directionsRenderer.setMap(null);

    const panel = $('map-overview-panel');
    if (panel) panel.classList.remove('hidden');

    setOverviewLayersFromControls();

    if (recenter) {
        if (state.overviewBounds && !state.overviewBounds.isEmpty()) {
            state.map.fitBounds(state.overviewBounds, { top: 90, right: 40, bottom: 90, left: 40 });
        } else {
            state.map.setCenter(DEFAULT_CENTER);
            state.map.setZoom(DEFAULT_ZOOM);
        }
    }
}

export function hideTransitOverviewMap() {
    state.isOverviewMode = false;
    if (state.overviewInfoWindow) state.overviewInfoWindow.close();
    if (state.transitOverviewLayer) state.transitOverviewLayer.setMap(null);
    Object.keys(state.overviewLayerGroups).forEach((key) => setOverviewLayerGroupVisible(key, false));

    const panel = $('map-overview-panel');
    if (panel) panel.classList.add('hidden');
}

export function setOverviewLayersFromControls() {
    if (!state.mapsReady || !state.map) return;

    const googleToggle = $('layerGoogleTransit');
    if (state.transitOverviewLayer) {
        state.transitOverviewLayer.setMap(googleToggle?.checked ? state.map : null);
    }

    ['rail', 'bus', 'boat'].forEach((key) => {
        const input = document.querySelector(`[data-overview-layer="${key}"]`);
        setOverviewLayerGroupVisible(key, Boolean(input?.checked));
    });
}

function setOverviewLayerGroupVisible(key, visible) {
    (state.overviewLayerGroups[key] || []).forEach((line) => line.setMap(visible ? state.map : null));
}

function createOverviewPolyline({ path, line, title, zIndex }) {
    const style = getOverviewStyle(line);
    const isDashed = Array.isArray(style.dash);
    return new google.maps.Polyline({
        path,
        title,
        strokeColor: style.color,
        strokeOpacity: isDashed ? 0 : (style.opacity ?? 0.9),
        strokeWeight: style.weight ?? 4,
        geodesic: true,
        clickable: false,
        zIndex,
        icons: isDashed ? [{
            icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                strokeColor: style.color,
                scale: 2,
            },
            offset: '0',
            repeat: '12px',
        }] : undefined,
    });
}

function createOverviewMarker({ position, title, color, size, zIndex, html }) {
    const marker = new google.maps.Marker({
        position,
        title,
        icon: overviewDotIcon(color, size),
        optimized: true,
        zIndex,
    });
    marker.addListener('click', () => {
        state.overviewInfoWindow.setContent(`<div class="overview-info-window">${html}</div>`);
        state.overviewInfoWindow.open({ anchor: marker, map: state.map });
    });
    return marker;
}

function overviewDotIcon(color = '#ffffff', size = 12) {
    const radius = Math.max(3, Math.floor(size / 2) - 2);
    const center = Math.floor(size / 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${center}" cy="${center}" r="${radius}" fill="${color}" stroke="#111" stroke-width="2"/></svg>`;
    return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(size, size),
        anchor: new google.maps.Point(center, center),
    };
}

export function getOverviewStyle(line) {
    return OVERVIEW_LINE_STYLES[line] || { color: '#ffffff', weight: 3 };
}

export function toLatLng(item) {
    return new google.maps.LatLng(item.lat, item.lng);
}

function getDisplayName(station) {
    return state.currentLang === 'th' ? (station.name_th || station.name_en) : (station.name_en || station.name_th);
}

export function updateOverviewCountText() {
    const text = state.currentLang === 'th'
        ? `แสดงสถานีรถไฟฟ้า ${RAIL_STATION_COUNT} จุด / ช่วงเชื่อมสถานี ${RAIL_EDGE_COUNT} เส้น พร้อมจุดรถเมล์ ${BUS_STOP_COUNT} จุด และท่าเรือ ${BOAT_PIER_COUNT} จุด`
        : `Showing ${RAIL_STATION_COUNT} rail stations / ${RAIL_EDGE_COUNT} station links, plus ${BUS_STOP_COUNT} bus reference points and ${BOAT_PIER_COUNT} boat piers.`;
    const el = $('overview-count-note');
    if (el) el.innerText = text;
}
