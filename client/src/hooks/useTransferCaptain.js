import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { transferCaptain } from "../services/team.service";

export default function useTransferCaptain() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: transferCaptain,

        onSuccess: () => {

            toast.success("Captain transferred");

            queryClient.invalidateQueries({

                queryKey: ["team"]

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to transfer captain"

            );

        }

    });

}