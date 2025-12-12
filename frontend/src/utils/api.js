import axios from 'axios';

// আপনার Backend URL
const API_URL = 'https://healthcheck-backend-9pai.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error);
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/profile')
};

export const symptomAPI = {
    getAll: () => api.get('/symptoms'),
    getByCategory: (categoryId) => api.get(`/symptoms/category/${categoryId}`),
    checkSymptoms: (data) => api.post('/symptoms/check', data)
};

export const categoryAPI = {
    getAll: () => api.get('/categories')
};

export const articleAPI = {
    getAll: () => api.get('/articles'),
    getById: (id) => api.get(`/articles/${id}`)
};

export const hospitalAPI = {
    getAll: () => api.get('/hospitals')
};

export const firstAidAPI = {
    getAll: () => api.get('/firstaid')
};

export const historyAPI = {
    getAll: () => api.get('/history')
};

export default api;