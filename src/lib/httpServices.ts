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
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// (Response)
httpServices.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
        error.response?.data?.message || error.message || "خطای نامشخص";
        console.error("HTTP Error:", message);

        return Promise.reject(new Error(message));
    }
);

export default httpServices;
