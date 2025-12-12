import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL || 'https://healthcheck-backend-9pai.onrender.com';



const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30 seconds timeout
});

// Request interceptor
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

// Response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/profile')
};

// Symptom APIs
export const symptomAPI = {
    getAll: () => api.get('/symptoms'),
    getByCategory: (categoryId) => api.get(`/symptoms/category/${categoryId}`),
    checkSymptoms: (data) => api.post('/symptoms/check', data)
};

// Category APIs
export const categoryAPI = {
    getAll: () => api.get('/categories')
};

// Article APIs
export const articleAPI = {
    getAll: () => api.get('/articles'),
    getById: (id) => api.get(`/articles/${id}`)
};

// Hospital APIs
export const hospitalAPI = {
    getAll: () => api.get('/hospitals')
};

// First Aid APIs
export const firstAidAPI = {
    getAll: () => api.get('/firstaid')
};

// History APIs
export const historyAPI = {
    getAll: () => api.get('/history')
};

export default api;