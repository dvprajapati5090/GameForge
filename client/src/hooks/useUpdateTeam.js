import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateTeam } from "../services/team.service";

export default function useUpdateTeam() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateTeam,

        onSuccess: () => {

            toast.success("Team updated successfully");

            queryClient.invalidateQueries({

                queryKey: ["team"]

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