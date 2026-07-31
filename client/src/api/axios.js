import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {

    failedQueue.forEach((promise) => {

        if (error) {

            promise.reject(error);

        } else {

            promise.resolve(token);

        }

    });

    failedQueue = [];

};

api.interceptors.request.use((config) => {

    const token = useAuthStore.getState().accessToken;

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        const status = error.response?.status;

        const publicRoutes = [
            "/auth/login",
            "/auth/register",
            "/auth/check-email",
            "/auth/check-username",
            "/auth/refresh-token"
        ];

        const shouldSkipRefresh = publicRoutes.some((route) =>
            originalRequest.url.includes(route)
        );

        if (

            status === 401 &&
            !originalRequest._retry &&
            !shouldSkipRefresh

        ) {

            if (isRefreshing) {

                return new Promise((resolve, reject) => {

                    failedQueue.push({
                        resolve,
                        reject
                    });

                }).then((token) => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);

                });

            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {

                const response = await axios.post(

                    `${API_URL}/auth/refresh-token`,

                    {},

                    {
                        withCredentials: true
                    }

                );

                const newAccessToken =
                    response.data.data.accessToken;

                useAuthStore
                    .getState()
                    .setAccessToken(newAccessToken);

                processQueue(
                    null,
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            }

            catch (refreshError) {

                processQueue(refreshError);

                useAuthStore.getState().logout();

                window.location.replace("/login");

                return Promise.reject(refreshError);

            }

            finally {

                isRefreshing = false;

            }

        }

        return Promise.reject(error);

    }

);

export default api;