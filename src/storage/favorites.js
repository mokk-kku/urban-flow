import { $ } from '../core/dom.js';
import { state, t } from '../core/app-state.js';
import { escapeHtml } from '../core/utils.js';
import { modeFromPreferenceCode, preferenceCode, preferenceLabel } from '../routing/preferences.js';
import { supabase } from '../supabase-client.js';
import { resetRouteVisualization } from '../maps/map-service.js';

function latLngValue(location, key) {
    if (!location) return null;
    const value = location[key];
    return typeof value === 'function' ? value.call(location) : value;
}

export async function saveRoute(routeIndex) {
    const candidate = state.lastCandidates.find((item) => item.index === routeIndex);
    if (!candidate || !supabase || !state.currentUser) return;
    if (!state.selectedOrigin?.location || !state.selectedDestination?.location) {
        alert(state.currentLang === 'th' ? 'ไม่พบพิกัดต้นทางหรือปลายทาง' : 'Origin or destination coordinates are missing.');
        return;
    }

    const originName = state.selectedOrigin?.name || $('originInput').value.trim();
    const destinationName = state.selectedDestination?.name || $('destinationInput').value.trim();
    const routeName = `${originName} → ${destinationName}`.slice(0, 150);

    const { error } = await supabase.rpc('create_saved_route', {
        p_route_name: routeName,
        p_origin_place_id: state.selectedOrigin?.placeId || null,
        p_origin_name: originName,
        p_origin_latitude: Number(latLngValue(state.selectedOrigin.location, 'lat')),
        p_origin_longitude: Number(latLngValue(state.selectedOrigin.location, 'lng')),
        p_destination_place_id: state.selectedDestination?.placeId || null,
        p_destination_name: destinationName,
        p_destination_latitude: Number(latLngValue(state.selectedDestination.location, 'lat')),
        p_destination_longitude: Number(latLngValue(state.selectedDestination.location, 'lng')),
        p_route_preference: preferenceCode(),
    });

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    await renderFavorites();
    alert(t('saved'));
}

export async function renderFavorites() {
    if (!$('favoritesList')) return;
    if (!supabase || !state.currentUser) {
        $('favoritesList').innerHTML = `<div class="empty-state">${escapeHtml(t('loginRequired'))}</div>`;
        return;
    }

    const { data, error } = await supabase.rpc('get_my_saved_routes');
    if (error) {
        console.error(error);
        $('favoritesList').innerHTML = `<div class="empty-state">${escapeHtml(t('favoriteLoadError'))}</div>`;
        return;
    }

    const saved = data || [];
    if (!saved.length) {
        $('favoritesList').innerHTML = `<div class="empty-state">${escapeHtml(t('favoriteEmpty'))}</div>`;
        return;
    }

    $('favoritesList').innerHTML = saved.map((item) => `
        <div class="favorite-card" data-favorite-id="${item.id}">
            <b>${escapeHtml(item.route_name)}</b>
            <p>${escapeHtml(item.origin_name)} → ${escapeHtml(item.destination_name)}</p>
            <p class="favorite-meta">${escapeHtml(preferenceLabel(item.route_preference))}</p>
            <div class="favorite-actions">
                <button class="secondary-btn" data-action="use-favorite" data-favorite-id="${item.id}">${escapeHtml(t('favoriteUse'))}</button>
                <button class="secondary-btn danger-outline" data-action="delete-favorite" data-favorite-id="${item.id}">${escapeHtml(t('favoriteDelete'))}</button>
            </div>
        </div>`).join('');

    document.querySelectorAll('[data-action="use-favorite"]').forEach((button) => {
        button.addEventListener('click', () => useFavorite(saved.find((item) => item.id === button.dataset.favoriteId)));
    });

    document.querySelectorAll('[data-action="delete-favorite"]').forEach((button) => {
        button.addEventListener('click', () => deleteFavorite(button.dataset.favoriteId));
    });
}

async function deleteFavorite(id) {
    if (!supabase) return;
    const { error } = await supabase.from('saved_routes').delete().eq('id', id);
    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }
    await renderFavorites();
}

async function useFavorite(item) {
    if (!item) return;

    state.selectedOrigin = {
        placeId: item.origin_place_id || null,
        name: item.origin_name,
        address: '',
        location: { lat: Number(item.origin_latitude), lng: Number(item.origin_longitude) },
    };
    state.selectedDestination = {
        placeId: item.destination_place_id || null,
        name: item.destination_name,
        address: '',
        location: { lat: Number(item.destination_latitude), lng: Number(item.destination_longitude) },
    };

    $('originInput').value = item.origin_name;
    $('destinationInput').value = item.destination_name;
    state.currentMode = modeFromPreferenceCode(item.route_preference);

    document.querySelectorAll('.mode-card').forEach((button) => {
        button.classList.toggle('active', button.dataset.mode === state.currentMode);
    });

    resetRouteVisualization(true);
    document.querySelector('[data-target="page-route"]')?.click();

    const { error } = await supabase
        .from('saved_routes')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', item.id);
    if (error) console.error('Could not update last_used_at:', error);
}
