import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        // You can add custom logic here (e.g., adding auth tokens)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        // You can add custom logic for successful responses
        return response;
    },
    (error) => {
        // You can add custom error handling here
        return Promise.reject(error);
    }
);

export default instance;