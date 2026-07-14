import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { loginUser } from "../services/auth.service";
import useAuthStore from "../store/authStore";

export default function useLogin() {

    const navigate = useNavigate();

    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    return useMutation({

        mutationFn: loginUser,

        onSuccess: (response) => {

            const { user, accessToken } = response.data;

            setUser(user);
            setAccessToken(accessToken);

            toast.success("Login successful!");

            navigate("/");
        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }

    });

}