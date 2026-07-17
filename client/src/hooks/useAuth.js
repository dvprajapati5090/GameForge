import { useEffect, useState } from "react";

import useAuthStore from "../store/authStore";

import {
    refreshToken,
    getCurrentUser
} from "../services/auth.service";

export default function useAuth() {

    const [loading, setLoading] = useState(true);

    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {

        async function restoreSession() {

            try {

                const refreshResponse = await refreshToken();

                const accessToken =
                    refreshResponse.data.accessToken;

                setAccessToken(accessToken);

                const meResponse =
                    await getCurrentUser();

                setUser(meResponse.data);

            }

            catch (err) {

                logout();

                console.log("No active session");

            }

            finally {

                setLoading(false);

            }

        }

        restoreSession();

    }, []);

    return loading;

}