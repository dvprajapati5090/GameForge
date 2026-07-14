import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateProfile } from "../services/profile.service";
import useAuthStore from "../store/authStore";

export default function useUpdateProfile() {

    const setUser = useAuthStore(
        (state) => state.setUser
    );

    return useMutation({

        mutationFn: updateProfile,

        onSuccess: (response) => {

            console.log("API Response:", response);

            console.log("User Before:", useAuthStore.getState().user);

            setUser(response.data);

            console.log("User After:", useAuthStore.getState().user);

            toast.success("Profile updated successfully!");

        },
        
        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to update profile"

            );

        }

    });

}