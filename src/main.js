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
import { isSupabaseConfigured, supabase } from './supabase-client.js';
import { loadCurrentProfile } from './services/profile-service.js';
import { setupCommunity } from './ui/community.js';

bootstrap();

async function bootstrap() {
    if (!isSupabaseConfigured || !supabase) {
        window.location.replace('auth.html');
        return;
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
        window.location.replace('auth.html');
        return;
    }

    await loadCurrentProfile(data.user);

    setupLanguage();
    setupNavigation();
    setupProfile();
    setupGeneralEvents();
    setupCommunity();
    await renderFavorites();

    try {
        await loadGoogleMaps(state.currentLang);
        state.mapsReady = true;
        initMaps();
        initPlacesAutocomplete();
        hideApiStatus();
    } catch (googleError) {
        showApiStatus(`${t('apiKeyTitle')}<br><small>${t('apiKeyBody')}</small>`);
        console.error(googleError);
    }
}
