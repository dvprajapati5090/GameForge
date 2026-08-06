import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateProfile } from "../services/profile.service";
import useAuthStore from "../store/authStore";

export default function useUpdateProfile() {
    const updateUser = useAuthStore((state) => state.updateUser);
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,

        onSuccess: (response) => {
            // API returns { data: { user: {...} } } or { data: {...} }
            const updatedUser =
                response?.data?.user ||
                response?.data ||
                response;

            if (updatedUser && typeof updatedUser === 'object' && updatedUser._id) {
                // Cache-bust avatar URL so browser shows the fresh image immediately
                const userWithCacheBust = updatedUser.avatar
                    ? {
                        ...updatedUser,
                        avatar: `${updatedUser.avatar.split('?')[0]}?t=${Date.now()}`
                    }
                    : updatedUser;

                setUser(userWithCacheBust);

                // Also invalidate any profile queries so pages re-fetch fresh data
                queryClient.invalidateQueries({ queryKey: ["profile"] });
                queryClient.invalidateQueries({ queryKey: ["players"] });
            } else if (updatedUser) {
                // Partial update — merge into current user
                updateUser(updatedUser);
            }

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