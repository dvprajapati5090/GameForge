import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { leaveTeam } from "../services/team.service";

export default function useLeaveTeam() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: leaveTeam,

        onSuccess: () => {

            toast.success("You left the team");

            queryClient.invalidateQueries({

                queryKey: ["team"]

            });

            queryClient.invalidateQueries({

                queryKey: ["invitations"]

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to leave team"

            );

        }

    });

}