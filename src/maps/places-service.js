import { $ } from '../core/dom.js';
import { state } from '../core/app-state.js';
import { resetRouteVisualization } from './map-service.js';

export function initPlacesAutocomplete() {
    const bounds = new google.maps.LatLngBounds(
        { lat: 13.45, lng: 100.25 },
        { lat: 14.15, lng: 100.95 },
    );

    const options = {
        fields: ['place_id', 'name', 'formatted_address', 'geometry'],
        componentRestrictions: { country: 'th' },
        bounds,
        strictBounds: false,
    };

    state.originAutocomplete = new google.maps.places.Autocomplete($('originInput'), options);
    state.destinationAutocomplete = new google.maps.places.Autocomplete($('destinationInput'), options);

    state.originAutocomplete.addListener('place_changed', () => {
        state.selectedOrigin = normalizeAutocompletePlace(state.originAutocomplete.getPlace(), $('originInput').value);
        resetRouteVisualization(true);
    });

    state.destinationAutocomplete.addListener('place_changed', () => {
        state.selectedDestination = normalizeAutocompletePlace(state.destinationAutocomplete.getPlace(), $('destinationInput').value);
        resetRouteVisualization(true);
    });
}

export function normalizeAutocompletePlace(place, fallbackName) {
    if (!place || !place.geometry || !place.geometry.location) return null;
    return {
        placeId: place.place_id || null,
        name: place.name || fallbackName,
        address: place.formatted_address || '',
        location: place.geometry.location,
    };
}
