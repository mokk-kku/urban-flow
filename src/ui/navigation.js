import { $ } from '../core/dom.js';
import { state } from '../core/app-state.js';
import { showTransitOverviewMap } from '../maps/overview-layer.js';

export function setupNavigation() {
    document.querySelectorAll('[data-target]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const targetId = event.currentTarget.dataset.target;
            if (!targetId) return;

            document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
            document.querySelectorAll('.page-section').forEach((p) => p.classList.remove('active'));

            const navBtn = document.querySelector(`.nav-item[data-target="${targetId}"]`);
            if (navBtn) navBtn.classList.add('active');
            $(targetId).classList.add('active');

            if (state.mapsReady && targetId === 'page-map') {
                setTimeout(() => {
                    google.maps.event.trigger(state.map, 'resize');
                    if (!state.lastDirectionsResult) showTransitOverviewMap(false);
                }, 100);
            }

            if (state.mapsReady && targetId === 'page-route') {
                setTimeout(() => google.maps.event.trigger(state.miniMap, 'resize'), 100);
            }
        });
    });
}
