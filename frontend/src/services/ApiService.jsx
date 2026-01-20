import axios from 'axios';

// 1. Base Configuration
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Signup Function
export const registerUser = async (userData) => {
    try {
        // userData contains { name, email, password, role }
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        throw error; 
    }
};

// 3. Login Function
export const loginUser = async (credentials) => {
    try {
        // credentials = { email, password }
        const response = await api.post('/auth/login', credentials);
        return response.data; // Expecting: { "token": "eyJhGcio..." }
    } catch (error) {
        throw error;
    }
};
export default api