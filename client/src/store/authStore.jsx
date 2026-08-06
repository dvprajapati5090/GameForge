import { create } from "zustand";

const useAuthStore = create((set) => ({

    user: null,

    accessToken:
        sessionStorage.getItem("accessToken") || null,

    authLoading: true,

    setUser: (user) => set({ user }),

    // Merge partial user data (e.g., after avatar/profile update)
    updateUser: (partial) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...partial } : partial
        })),


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