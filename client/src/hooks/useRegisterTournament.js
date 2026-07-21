import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerTournament } from "../services/tournament.service";
import { toast } from "react-hot-toast";

export default function useRegisterTournament() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: registerTournament,

        onSuccess: (_, id) => {

            toast.success("Registered successfully");

            queryClient.invalidateQueries({
                queryKey: ["tournament", id]
            });

            queryClient.invalidateQueries({
                queryKey: ["tournaments"]
            });

        },
        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    });

}