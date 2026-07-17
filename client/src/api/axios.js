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

    async (error) => {

        const originalRequest = error.config;

        if (

            console.log("AXIOS ERROR:", error.response);

            return Promise.reject(error);

        ) {

            originalRequest._retry = true;

            try {

                const response = await axios.post(

                    `${API_URL}/auth/refresh-token`,

                    {},

                    {
                        withCredentials: true
                    }

                );

                const accessToken = response.data.data.accessToken;

                useAuthStore
                    .getState()
                    .setAccessToken(accessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${accessToken}`;

                return api(originalRequest);

            }

            catch {

                useAuthStore.getState().logout();

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }

);

export default api;
