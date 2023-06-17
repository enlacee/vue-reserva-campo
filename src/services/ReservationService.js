const VITE_API_APPSCRIPT = import.meta.env.VITE_API_APPSCRIPT;
const URL = VITE_API_APPSCRIPT;

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
        const THE_URL = URL + `?op=${OPERATION}&date=${date}`;

        return fetch(THE_URL, { method: 'GET' })
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

    getByDateAndHour(date, startHourNumber) {
        const OPERATION = 'list-reservations';
        const THE_URL = URL + `?op=${OPERATION}&date=${date}&hour=${startHourNumber}`;

        return fetch(THE_URL, { method: 'GET' })
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
     * @param {object} request - The data object used to fetch
     * @returns {Promise<object>}
     */
    add(request = {}) {
        const { date } = request;
        const OPERATION = 'register-reservation';
        const params = {
            op: OPERATION,
            date: date
        };
        const options = {
            method: 'POST',
            body: JSON.stringify( params )
        };

        return fetch(URL, options)
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
