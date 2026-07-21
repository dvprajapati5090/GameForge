import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTournament } from "../services/tournament.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCreateTournament() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({

        mutationFn: createTournament,

        onSuccess: () => {

            toast.success("Tournament created!");

            queryClient.invalidateQueries({

                queryKey: ["tournaments"]

            });

            navigate("/host/tournaments");

        },
        
        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Failed to create tournament"
            );

        }

    });

}