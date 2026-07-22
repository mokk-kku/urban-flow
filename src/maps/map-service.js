import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../config.js';
import { state } from '../core/app-state.js';
import { $ } from '../core/dom.js';
import { DARK_STYLE } from './map-style.js';
import { initTransitOverviewLayers, showTransitOverviewMap } from './overview-layer.js';
import { showResultMessage } from '../ui/messages.js';
import { t } from '../core/app-state.js';

export function initMaps() {
    state.map = new google.maps.Map($('map'), {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        styles: DARK_STYLE,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: true,
    });

    state.miniMap = new google.maps.Map($('mini-map'), {
        center: DEFAULT_CENTER,
        zoom: 11,
        styles: DARK_STYLE,
        disableDefaultUI: true,
        gestureHandling: 'none',
        clickableIcons: false,
    });

    state.directionsService = new google.maps.DirectionsService();
    state.directionsRenderer = new google.maps.DirectionsRenderer({
        map: state.map,
        suppressMarkers: false,
        preserveViewport: false,
        polylineOptions: {
            strokeColor: '#00e676',
            strokeOpacity: 0.85,
            strokeWeight: 5,
        },
    });

    state.miniDirectionsRenderer = new google.maps.DirectionsRenderer({
        map: state.miniMap,
        suppressMarkers: false,
        preserveViewport: false,
        polylineOptions: {
            strokeColor: '#00e676',
            strokeOpacity: 0.9,
            strokeWeight: 4,
        },
    });
    state.miniDirectionsRenderer.setMap(null);

    state.geocoder = new google.maps.Geocoder();

    initTransitOverviewLayers();
    showTransitOverviewMap(true);
}

export function updateMiniMapRoute(result, routeIndex) {
    if (!state.mapsReady || !state.miniMap || !state.miniDirectionsRenderer || !result?.routes?.length) return;
    clearPreview();
    state.miniDirectionsRenderer.setMap(state.miniMap);
    state.miniDirectionsRenderer.setDirections(result);
    state.miniDirectionsRenderer.setRouteIndex(routeIndex);
    setTimeout(() => google.maps.event.trigger(state.miniMap, 'resize'), 80);
}

export function clearMiniMapRoute(resetView = false) {
    clearPreview();
    if (state.miniDirectionsRenderer) state.miniDirectionsRenderer.setMap(null);
    if (resetView && state.miniMap) {
        state.miniMap.setCenter(DEFAULT_CENTER);
        state.miniMap.setZoom(11);
    }
}

export function resetRouteVisualization(clearResults = false) {
    state.lastDirectionsResult = null;
    state.lastCandidates = [];
    state.selectedCandidateIndex = 0;

    if (state.directionsRenderer) state.directionsRenderer.setMap(null);
    clearMiniMapRoute(true);
    showTransitOverviewMap(true);

    if (clearResults) showResultMessage(t('readyToSearch'));
}

export function clearPreview() {
    state.previewMarkers.forEach((marker) => marker.setMap(null));
    state.previewMarkers = [];
    if (state.previewLine) state.previewLine.setMap(null);
    state.previewLine = null;
}
