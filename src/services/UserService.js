// src/services/UserService.js
import BaseService from './BaseService';
import { API_BASE_URLS } from '@/config/apiConfig';

class UserService {
    getById(userId) {
        let params = {
            "op": 'user-by-id',
            "id": userId
        }

        return BaseService.get(params, API_BASE_URLS.app);
    }

}

export default new UserService();