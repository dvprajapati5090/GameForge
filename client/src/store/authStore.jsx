import { create } from "zustand";

const useAuthStore = create((set) => ({

    user: null,

    accessToken:
        sessionStorage.getItem("accessToken"),

    authLoading: true,

    setUser: (user) =>
        set({
            user
        }),

    setAccessToken: (token) => {

        if (token) {

            sessionStorage.setItem(
                "accessToken",
                token
            );

        } else {

            sessionStorage.removeItem(
                "accessToken"
            );

        }

        set({

            accessToken: token

        });

    },

    setAuthLoading: (loading) =>
        set({
            authLoading: loading
        }),

    logout: () => {

        sessionStorage.removeItem(
            "accessToken"
        );

        set({

            user: null,

            accessToken: null,

            authLoading: false

        });

    }

}));

export default useAuthStore;