import { $ } from '../core/dom.js';
import { state } from '../core/app-state.js';
import { calculateTransitRoutes } from '../routing/google-transit-service.js';
import { useCurrentLocationAsOrigin } from '../location/current-location.js';
import { setOverviewLayersFromControls } from '../maps/overview-layer.js';
import { resetRouteVisualization } from '../maps/map-service.js';
import { renderRouteCandidates } from '../routing/route-renderer.js';
import { setupLanguage } from './language.js';
import { renderFavorites } from '../storage/favorites.js';

export function setupGeneralEvents() {
    $('searchBtn').addEventListener('click', () => calculateTransitRoutes(false));

    $('swapBtn').addEventListener('click', () => {
        const tempPlace = state.selectedOrigin;
        state.selectedOrigin = state.selectedDestination;
        state.selectedDestination = tempPlace;

        const originValue = $('originInput').value;
        $('originInput').value = $('destinationInput').value;
        $('destinationInput').value = originValue;
        resetRouteVisualization(true);
    });

    $('useCurrentLocationBtn').addEventListener('click', useCurrentLocationAsOrigin);

    document.querySelectorAll('[data-overview-layer]').forEach((input) => {
        input.addEventListener('change', () => {
            if (state.isOverviewMode) setOverviewLayersFromControls();
        });
    });

    $('originInput').addEventListener('input', () => {
        state.selectedOrigin = null;
        resetRouteVisualization(true);
    });

    $('destinationInput').addEventListener('input', () => {
        state.selectedDestination = null;
        resetRouteVisualization(true);
    });

    document.querySelectorAll('.mode-card').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            document.querySelectorAll('.mode-card').forEach((b) => b.classList.remove('active'));
            event.currentTarget.classList.add('active');
            state.currentMode = event.currentTarget.dataset.mode;
            if (state.lastDirectionsResult) renderRouteCandidates(state.lastDirectionsResult);
        });
    });

    document.querySelectorAll('.toggle-switch').forEach((toggle) => {
        toggle.addEventListener('click', (event) => event.currentTarget.classList.toggle('active'));
    });

    $('menuLangToggle').addEventListener('click', () => {
        state.currentLang = state.currentLang === 'th' ? 'en' : 'th';
        localStorage.setItem('urban_lang', state.currentLang);
        setupLanguage();
        renderFavorites();
        if (state.lastDirectionsResult) renderRouteCandidates(state.lastDirectionsResult);
    });
}
