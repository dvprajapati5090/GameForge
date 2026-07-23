import { useMutation } from "@tanstack/react-query";

import { register } from "../services/auth.service";
import { completeGoogleProfile } from "../services/google.service";

import useAuthStore from "../store/authStore";

export default function useRegister() {

    const {
        setUser,
        setAccessToken
    } = useAuthStore();

    return useMutation({

        mutationFn: (data) => {

            if (data.googleId) {
                return completeGoogleProfile(data);
            }

            return register(data);

        },

        onSuccess: ({ data }) => {

            setUser(data.user);

            setAccessToken(data.accessToken);

        }

    });

}