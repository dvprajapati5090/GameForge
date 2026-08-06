import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTournament } from "../services/tournament.service";
import toast from "react-hot-toast";

export default function useUpdateTournament(id) {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (data) =>
            updateTournament(id, data),

        onSuccess: () => {

            toast.success("Tournament updated successfully!");

            // Invalidate all tournament caches so banner/changes show immediately
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

            const msg = error?.response?.data?.message || "Failed to update tournament";
            toast.error(msg);

            console.error("TOURNAMENT UPDATE ERROR");
            console.error(error);
            console.error(error?.response);
            console.error(error?.response?.data);

        }

    });

}