import { useEffect, useRef } from "react";

import useAuthStore from "../../store/authStore";
import { getCurrentUser } from "../../services/auth.service";
import api from "../../api/axios";

export default function AuthInitializer({ children }) {

    const {

        accessToken,

        setAccessToken,

        setUser,

        authLoading,

        setAuthLoading,

        logout

    } = useAuthStore();

    const initialized = useRef(false);

    useEffect(() => {

        if (initialized.current)
            return;

        initialized.current = true;

        const initialize = async () => {

            try {

                let token = accessToken;

                // If there is no access token,
                // try getting one using refresh token cookie.

                if (!token) {

                    const response = await api.post(
                        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
                        {},
                        {
                            withCredentials: true
                        }
                    );

                    token =
                        response.data.data.accessToken;

                    setAccessToken(token);

                }

                // Now fetch current user

                const userResponse =
                    await getCurrentUser();

                setUser(userResponse.data);

            }

            catch (error) {

                console.log(
                    "Auth initialization failed:",
                    error.message
                );

                logout();

            }

            finally {

                setAuthLoading(false);

            }

        };

        initialize();

    }, []);

    if (authLoading) {

        return (

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }

    return children;

}