import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateTeam } from "../services/team.service";

export default function useUpdateTeam() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateTeam,

        onSuccess: (response) => {

            toast.success("Team updated successfully");

            // Force refetch with cache-bust so the new logo/banner shows immediately
            queryClient.invalidateQueries({
                queryKey: ["team"]
            });

            // Also invalidate any team-related data used in other pages
            queryClient.invalidateQueries({
                queryKey: ["players"]
            });
        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Unable to update team"
            );

        }

    });

}