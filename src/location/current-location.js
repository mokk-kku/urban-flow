import { $ } from '../core/dom.js';
import { BANGKOK_SOFT_BOUNDS, state, t } from '../core/app-state.js';
import { resetRouteVisualization } from '../maps/map-service.js';
import { showResultMessage } from '../ui/messages.js';

export function useCurrentLocationAsOrigin() {
    if (!navigator.geolocation || !state.mapsReady || !state.geocoder) {
        alert(t('geolocationFail'));
        return;
    }

    const currentLocationBtn = $('useCurrentLocationBtn');
    state.currentLocationBtnOriginalTitle = state.currentLocationBtnOriginalTitle || currentLocationBtn.title;
    currentLocationBtn.disabled = true;
    currentLocationBtn.classList.add('loading');
    currentLocationBtn.title = t('checkingLocation');

    const resetCurrentLocationButton = () => {
        currentLocationBtn.disabled = false;
        currentLocationBtn.classList.remove('loading');
        currentLocationBtn.title = state.currentLocationBtnOriginalTitle;
    };

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        try {
            const isInBangkok = await isLocationInBangkok(location);
            if (!isInBangkok) {
                state.selectedOrigin = null;
                $('originInput').value = '';
                resetRouteVisualization(true);
                showResultMessage(t('outsideBangkok'), true);
                alert(t('outsideBangkok'));
                return;
            }

            state.selectedOrigin = {
                placeId: null,
                name: t('currentLocation'),
                address: '',
                location,
            };
            $('originInput').value = t('currentLocation');
            resetRouteVisualization(true);
        } catch (error) {
            console.error(error);
            showResultMessage(t('bangkokCheckFail'), true);
            alert(t('bangkokCheckFail'));
        } finally {
            resetCurrentLocationButton();
        }
    }, () => {
        resetCurrentLocationButton();
        alert(t('geolocationFail'));
    }, {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 30000,
    });
}

async function isLocationInBangkok(location) {
    if (!isInsideBangkokSoftBounds(location)) return false;

    const results = await geocodeLatLngAsync(location);
    return results.some((result) => (result.address_components || []).some((component) => {
        const types = component.types || [];
        const isCityOrProvince = types.includes('administrative_area_level_1') || types.includes('locality');
        if (!isCityOrProvince) return false;

        const longName = normalizeAddressComponent(component.long_name);
        const shortName = normalizeAddressComponent(component.short_name);
        return isBangkokName(longName) || isBangkokName(shortName);
    }));
}

function isInsideBangkokSoftBounds(location) {
    const lat = typeof location.lat === 'function' ? location.lat() : location.lat;
    const lng = typeof location.lng === 'function' ? location.lng() : location.lng;
    return lat >= BANGKOK_SOFT_BOUNDS.south
        && lat <= BANGKOK_SOFT_BOUNDS.north
        && lng >= BANGKOK_SOFT_BOUNDS.west
        && lng <= BANGKOK_SOFT_BOUNDS.east;
}

function geocodeLatLngAsync(location) {
    return new Promise((resolve, reject) => {
        state.geocoder.geocode({ location }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results?.length) resolve(results);
            else reject(new Error(status));
        });
    });
}

function normalizeAddressComponent(value = '') {
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ');
}

function isBangkokName(value) {
    return value.includes('bangkok')
        || value.includes('krung thep')
        || value.includes('กรุงเทพ');
}
