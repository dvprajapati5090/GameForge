import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { removeMember } from "../services/team.service";

export default function useRemoveMember() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: removeMember,

        onSuccess: () => {

            toast.success("Member removed");

            queryClient.invalidateQueries({

                queryKey: ["team"]

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to remove member"

            );

        }

    });

}