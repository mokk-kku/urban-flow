import { loadGoogleMaps } from './google-loader.js';
import { state, t } from './core/app-state.js';
import { setupLanguage } from './ui/language.js';
import { setupNavigation } from './ui/navigation.js';
import { setupProfile } from './ui/profile.js';
import { setupGeneralEvents } from './ui/events.js';
import { renderFavorites } from './storage/favorites.js';
import { initMaps } from './maps/map-service.js';
import { initPlacesAutocomplete } from './maps/places-service.js';
import { showApiStatus, hideApiStatus } from './ui/messages.js';

if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'auth.html';
}

init();

async function init() {
    setupLanguage();
    setupNavigation();
    setupProfile();
    setupGeneralEvents();
    renderFavorites();

    try {
        await loadGoogleMaps(state.currentLang);
        state.mapsReady = true;
        initMaps();
        initPlacesAutocomplete();
        hideApiStatus();
    } catch (error) {
        showApiStatus(`${t('apiKeyTitle')}<br><small>${t('apiKeyBody')}</small>`);
        console.error(error);
    }
}
