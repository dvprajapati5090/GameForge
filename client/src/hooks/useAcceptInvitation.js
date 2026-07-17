import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { acceptInvitation } from "../services/invitation.service";

export default function useAcceptInvitation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: acceptInvitation,

        onSuccess: () => {

            toast.success("Joined Team!");

            queryClient.invalidateQueries({

                queryKey: ["invitations"]

            });

            queryClient.invalidateQueries({

                queryKey: ["team"]

            });

        }

    });

}