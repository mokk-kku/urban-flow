import { $ } from '../core/dom.js';
import { state, t } from '../core/app-state.js';
import { clearMiniMapRoute } from '../maps/map-service.js';
import { showTransitOverviewMap } from '../maps/overview-layer.js';
import { renderRouteCandidates } from './route-renderer.js';
import { showResultMessage } from '../ui/messages.js';

export async function calculateTransitRoutes(switchToMap = false) {
    if (!state.mapsReady) return;
    if (!state.selectedOrigin || !state.selectedDestination) {
        showResultMessage(t('missingPlaces'), true);
        return;
    }

    $('searchBtn').disabled = true;
    showResultMessage(t('searching'));
    clearMiniMapRoute(true);

    const request = {
        origin: state.selectedOrigin.placeId ? { placeId: state.selectedOrigin.placeId } : state.selectedOrigin.location,
        destination: state.selectedDestination.placeId ? { placeId: state.selectedDestination.placeId } : state.selectedDestination.location,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
        region: 'TH',
        transitOptions: {
            departureTime: new Date(),
            modes: [
                google.maps.TransitMode.BUS,
                google.maps.TransitMode.RAIL,
                google.maps.TransitMode.SUBWAY,
                google.maps.TransitMode.TRAIN,
                google.maps.TransitMode.TRAM,
            ],
            routingPreference: state.currentMode === 'walk'
                ? google.maps.TransitRoutePreference.LESS_WALKING
                : undefined,
        },
    };

    try {
        const result = await routeAsync(request);
        state.lastDirectionsResult = result;
        renderRouteCandidates(result);
        if (switchToMap) document.querySelector('[data-target="page-map"]').click();
    } catch (error) {
        console.error(error);
        const message = error?.message === 'ZERO_RESULTS' ? t('transitUnavailable') : t('noRoute');
        showResultMessage(message, true);
        if (state.directionsRenderer) state.directionsRenderer.setMap(null);
        clearMiniMapRoute(true);
        showTransitOverviewMap(true);
    } finally {
        $('searchBtn').disabled = false;
    }
}

export function routeAsync(request) {
    return new Promise((resolve, reject) => {
        state.directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result?.routes?.length) resolve(result);
            else reject(new Error(status));
        });
    });
}
