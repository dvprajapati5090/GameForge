import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
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

            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-token")

        ) {

            originalRequest._retry = true;

            try {

                const response = await axios.post(

                    "http://localhost:5000/api/auth/refresh-token",

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