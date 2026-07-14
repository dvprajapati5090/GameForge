import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import api from "../api/axios";
import useAuthStore from "../store/authStore";

export default function useSyncRiot() {

    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({

        mutationFn: async () => {

            const response = await api.post("/profile/sync-riot");

            return response.data;

        },

        onSuccess: (response) => {

            setUser(response.data);

            toast.success("Riot profile synced!");

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to sync Riot profile."

            );

        }

    });

}