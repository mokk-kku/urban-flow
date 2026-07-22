import { GOOGLE_MAPS_API_KEY } from './config.js';

let googleMapsPromise = null;

export function loadGoogleMaps(language = 'th') {
    if (window.google?.maps?.places) return Promise.resolve(window.google.maps);
    if (googleMapsPromise) return googleMapsPromise;

    googleMapsPromise = new Promise((resolve, reject) => {
        if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.includes('PUT_YOUR')) {
            reject(new Error('Missing Google Maps API key. Open src/config.js and set GOOGLE_MAPS_API_KEY.'));
            return;
        }

        const callbackName = `initUrbanFlowGoogleMaps_${Date.now()}`;
        window[callbackName] = () => {
            resolve(window.google.maps);
            delete window[callbackName];
        };

        const script = document.createElement('script');
        const params = new URLSearchParams({
            key: GOOGLE_MAPS_API_KEY,
            libraries: 'places,geometry',
            language,
            region: 'TH',
            callback: callbackName,
            loading: 'async',
        });
        script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error('Google Maps JavaScript API failed to load.'));
        document.head.appendChild(script);
    });

    return googleMapsPromise;
}
