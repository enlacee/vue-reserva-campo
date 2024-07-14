
import { API_BASE_URLS } from '@/config/apiConfig';

class BaseService {
    constructor() {
        this.defaultBaseURL = API_BASE_URLS.web;
    }

    request(params = {}, method = 'GET', body = null, baseURL = this.defaultBaseURL) {
        const url = new URL(baseURL);
        url.search = new URLSearchParams({ ...params }).toString();

        const options = {
            method,
            // headers: { 'Content-Type': 'application/json' },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error de red:', error); // Registro del error
                throw error;
            });
    }

    get(params = {}, baseURL) {
        return this.request(params, 'GET', null, baseURL);
    }

    post(body, params = {}, baseURL) {
        return this.request(params, 'POST', body, baseURL);
    }
}

export default new BaseService();
