import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { deleteTournament } from "../services/tournament.service";

export default function useDeleteTournament() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({

        mutationFn: deleteTournament,

        onSuccess: () => {

            toast.success("Tournament deleted successfully");

            queryClient.invalidateQueries({
                queryKey: ["tournaments"]
            });

            navigate("/host/tournaments");

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete tournament"
            );

        }

    });

}