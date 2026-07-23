import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTournament } from "../services/tournament.service";

export default function useUpdateTournament(id) {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (data) =>
            updateTournament(id, data),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["tournament", id]
            });

            queryClient.invalidateQueries({
                queryKey: ["host-tournaments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["tournaments"]
            });

        },

        onError: (error) => {

            console.error("TOURNAMENT UPDATE ERROR");

            console.error(error);

            console.error(error?.response);

            console.error(error?.response?.data);

        }

    });

}