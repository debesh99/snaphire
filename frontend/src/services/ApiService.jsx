import axios from 'axios';

// 1. Base Configuration
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// This automatically adds the JWT Token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && !config.url.includes('/auth') && !config.url.includes('/users')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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

// 4. Create/Post Job Function
export const createJob = async (jobData) => {
    // jobData = { title, description, location, experienceRequired }
    return (await api.post('/jobs', jobData)).data;
};

//5. Job Feed Related Functions

// i. Get All Jobs
export const getAllJobs = async () => {
    return (await api.get('/jobs')).data;
};

// ii. Delete Job
export const deleteJob = async (id) => {
    return (await api.delete(`/jobs/${id}`)).data;
};

// iii. Apply for Job
export const applyForJob = async (userId, jobId) => {
    // Sending jobId and userId as query parameters.
    return (await api.post(`/applications/apply?userId=${userId}&jobId=${jobId}`)).data;
};

// iv. Get Applicants for a Job
export const getApplicants = async (jobId) => {
    return (await api.get(`/applications/job/${jobId}`)).data;
};

// v. Delete Application (Reject Candidate)
export const deleteApplication = async (applicationId) => {
    return (await api.delete(`/applications/${applicationId}`)).data;
};

// vi. Update Application Status
export const updateApplicationStatus = async (applicationId, status) => {
    return (await api.put(`/applications/${applicationId}/status?status=${status}`)).data;
};

export default api
