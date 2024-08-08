const VITE_USER_DEMO_ID = import.meta.env.VITE_USER_DEMO_ID;
const BASE_URL = import.meta.env.BASE_URL;

/**
 * Get 24 hours format to printed
 * 
 * @param {integer} hour 
 * @returns string date in 24hours format
 */
export function get24HoursFormatFromNumber(hour){
    return hour.toString().padStart(2, '0') + ':00';
};

export const Browser = {
    getCurrentUrl() {
        return window.location.href;
    },
    getIdFromUrl() {
        let result = '';
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('id')) {
            result = urlParams.get('id');
        } else {
            result = VITE_USER_DEMO_ID;
        }

        return result;
    },
    getURLDemo() {
        return BASE_URL + `?id=${VITE_USER_DEMO_ID}`;
    }
};
