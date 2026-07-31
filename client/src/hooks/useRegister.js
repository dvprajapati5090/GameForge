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

        onSuccess: (response) => {

            // Only Google registration logs the user in
            if (response.data) {

                const {

                    user,
                    accessToken

                } = response.data;

                setUser(user);

                setAccessToken(accessToken);

            }

            // Do NOT navigate here.
            // StepReview will decide what to do.

        }

    });

}