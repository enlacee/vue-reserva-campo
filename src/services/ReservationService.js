const VITE_API_APPSCRIPT = import.meta.env.VITE_API_APPSCRIPT;
const BASE_URL = VITE_API_APPSCRIPT;

class ReservationService {

    /**
     * Get all reservations filtered by data 'date',
     *
     * @param {object} data - The data object used to fetch
     * @returns {Promise<object>}
     */
    get(data = {}) {
        const { date } = data; // {a:111, b:222}; Destructuring assignment
        const OPERATION = 'list-reservations';
        const url = BASE_URL + `?op=${OPERATION}&date=${date}`;

        return fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
    }

    /**
     * Register a new reservation
     *
     * @param {object} params - The data
     * @returns {Promise<object>}
     */
    makeTheReservation(params) {
        const OPERATION = 'list-reservations';
        const queryParameters = Object.assign({ op: OPERATION}, params);
        const url = `${BASE_URL}?${Object.entries(queryParameters)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&')}`;

        console.log('url', url);

        return fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
    }
}

export default new ReservationService();
