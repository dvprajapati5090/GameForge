import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {

    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

api.interceptors.response.use(

    (response) => response,

    (error) => {

        console.log("========== AXIOS ERROR ==========");
        console.log("Status:", error.response?.status);
        console.log("URL:", error.config?.url);
        console.log("Response:", error.response?.data);
        console.log(error);
        console.log("=================================");

        return Promise.reject(error);

    }

);

export default api;
