import { useMutation } from "@tanstack/react-query";

import { register } from "../services/auth.service";

import useAuthStore from "../store/authStore";

export default function useRegister() {

    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({

        mutationFn: register,

        onSuccess: (response) => {

            setUser(response.data.user);

        }

    });

}