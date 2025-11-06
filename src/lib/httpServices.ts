import { baseBackendURL } from "@/lib/config";
import axios from "axios";

const httpServices = axios.create({
    baseURL: baseBackendURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// (Request)
httpServices.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// (Response)
httpServices.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiMessage = 
            error.response?.data?.detail || // Django REST Framework استاندارد
            error.response?.data?.message || 
            error.response?.data?.error || 
            error.message || 
            "خطای نامشخص";

        return Promise.reject(new Error(apiMessage));
    }
);

export default httpServices;
