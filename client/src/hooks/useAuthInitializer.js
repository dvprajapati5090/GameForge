import { useEffect, useState } from "react";

import { refreshToken, getCurrentUser } from "../services/auth.service";
import useAuthStore from "../store/authStore";

export default function useAuthInitializer() {

    const [loading, setLoading] = useState(true);

    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {

        async function initialize() {

            try {

                const refresh = await refreshToken();

                setAccessToken(
                    refresh.data.accessToken
                );

                const me = await getCurrentUser();

                setUser(
                    me.data
                );

            }

            catch {

                logout();

            }

            finally {

                setLoading(false);

            }

        }

        initialize();

    }, []);

    return loading;

}