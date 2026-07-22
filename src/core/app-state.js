import {
    RAIL_STATIONS,
    RAIL_EDGES,
    BUS_CORRIDORS,
    BOAT_ROUTES,
} from '../transit-overview-data.js';

export const RAIL_STATION_COUNT = RAIL_STATIONS.length;
export const RAIL_EDGE_COUNT = RAIL_EDGES.length;
export const BUS_STOP_COUNT = BUS_CORRIDORS.reduce((total, corridor) => total + corridor.stops.length, 0);
export const BOAT_PIER_COUNT = BOAT_ROUTES.reduce((total, route) => total + route.piers.length, 0);

export const STRINGS = {
    th: {
        apiKeyTitle: 'ยังไม่ได้ตั้งค่า Google API Key',
        apiKeyBody: 'เปิดไฟล์ src/config.js แล้วใส่ค่า GOOGLE_MAPS_API_KEY จาก Google Cloud Console',
        missingPlaces: 'กรุณาเลือกสถานที่เริ่มต้นและปลายทาง',
        readyToSearch: 'กดค้นหาเส้นทางเพื่อแสดงผลลัพธ์บนแผนที่ตัวอย่าง',
        geolocationFail: 'ไม่สามารถอ่านตำแหน่งปัจจุบันได้',
        checkingLocation: 'กำลังตรวจสอบตำแหน่ง...',
        outsideBangkok: 'ตำแหน่งปัจจุบันอยู่นอกพื้นที่กรุงเทพมหานคร จึงไม่สามารถใช้เป็นจุดเริ่มต้นได้',
        bangkokCheckFail: 'ไม่สามารถตรวจสอบได้ว่าตำแหน่งอยู่ในกรุงเทพมหานครหรือไม่ กรุณาตรวจสอบการเปิดใช้งาน Geocoding API',
        searching: 'กำลังค้นหาเส้นทาง...',
        noRoute: 'ไม่พบเส้นทางขนส่งสาธารณะสำหรับตำแหน่งนี้',
        recommended: 'แนะนำ',
        distance: 'ระยะทาง',
        time: 'ระยะเวลา',
        fare: 'ค่าโดยสาร',
        walk: 'เดินเท้า',
        transfers: 'เปลี่ยนสาย',
        min: 'นาที',
        km: 'กม.',
        m: 'ม.',
        baht: 'บาท',
        approx: 'ประมาณ',
        googleFare: 'จาก Google',
        save: 'บันทึกเส้นทาง',
        openMap: 'ดูบนแผนที่',
        saved: 'บันทึกแล้ว',
        favoriteEmpty: 'ยังไม่มีเส้นทางที่บันทึกไว้',
        currentLocation: 'ตำแหน่งปัจจุบันของฉัน',
        routeWarning: 'หมายเหตุ: ค่าโดยสารถูกใช้จาก Google เมื่อมีข้อมูล หากไม่มี ระบบจะประมาณจากชนิดระบบขนส่งในแต่ละช่วง',
        transitUnavailable: 'Google ไม่ส่งเส้นทางขนส่งสาธารณะในช่วงเวลานี้ ลองเปลี่ยนจุดหมายหรือเวลาค้นหา',
        routeOption: 'ตัวเลือก',
        railDetailNote: `พล็อตสถานีรถไฟฟ้า ${RAIL_STATION_COUNT} จุด และเชื่อมเส้นทาง ${RAIL_EDGE_COUNT} ช่วงจากไฟล์โครงข่าย`,
    },
    en: {
        apiKeyTitle: 'Google API key is not configured',
        apiKeyBody: 'Open src/config.js and set GOOGLE_MAPS_API_KEY from Google Cloud Console.',
        missingPlaces: 'Please select both origin and destination.',
        readyToSearch: 'Search a route to show the result on the preview map.',
        geolocationFail: 'Could not read your current location.',
        checkingLocation: 'Checking your location...',
        outsideBangkok: 'Your current location is outside Bangkok, so it cannot be used as an origin.',
        bangkokCheckFail: 'Could not verify whether your location is in Bangkok. Please check that Geocoding API is enabled.',
        searching: 'Searching route...',
        noRoute: 'No public-transit route was found for these places.',
        recommended: 'Recommended',
        distance: 'Distance',
        time: 'Time',
        fare: 'Fare',
        walk: 'Walk',
        transfers: 'Transfers',
        min: 'min',
        km: 'km',
        m: 'm',
        baht: 'THB',
        approx: 'Approx.',
        googleFare: 'Google fare',
        save: 'Save route',
        openMap: 'Open map',
        saved: 'Saved',
        favoriteEmpty: 'No saved routes yet.',
        currentLocation: 'My current location',
        routeWarning: 'Note: fares use Google data when available. Otherwise, the app estimates fare from transit vehicle types.',
        transitUnavailable: 'Google did not return a transit route right now. Try another destination or search time.',
        routeOption: 'Option',
        railDetailNote: `Plots ${RAIL_STATION_COUNT} rail stations and ${RAIL_EDGE_COUNT} rail links from the project network file.`,
    },
};

export const BANGKOK_SOFT_BOUNDS = {
    south: 13.49,
    north: 13.96,
    west: 100.32,
    east: 100.95,
};

export const state = {
    currentLocationBtnOriginalTitle: '',
    currentLang: localStorage.getItem('urban_lang') || 'th',
    currentMode: 'distance',
    mapsReady: false,
    map: null,
    miniMap: null,
    directionsService: null,
    directionsRenderer: null,
    miniDirectionsRenderer: null,
    geocoder: null,
    originAutocomplete: null,
    destinationAutocomplete: null,
    selectedOrigin: null,
    selectedDestination: null,
    lastDirectionsResult: null,
    lastCandidates: [],
    selectedCandidateIndex: 0,
    previewMarkers: [],
    previewLine: null,
    transitOverviewLayer: null,
    overviewLayerGroups: {},
    overviewBounds: null,
    overviewInfoWindow: null,
    isOverviewMode: false,
    userEmail: sessionStorage.getItem('userEmail') || 'guest@urbanflow.local',
    userName: '',
};

state.userName = localStorage.getItem(`urban_name_${state.userEmail}`) || state.userEmail.split('@')[0];

export function t(key) {
    return STRINGS[state.currentLang]?.[key] || key;
}
