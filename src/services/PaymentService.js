const VITE_API_APPSCRIPT = import.meta.env.VITE_API_APPSCRIPT;
const URL = VITE_API_APPSCRIPT;

class PaymentService {

    /**
     * Get all payments filtered by data,
     *
     * @param {object} data - The data object used to fetch
     * @returns {Promise<object>}
     */
    get(data = {}) {
        const { date } = data; // Destructuring assignment
        const OPERATION = 'list-payments';
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
}

export default new PaymentService();
