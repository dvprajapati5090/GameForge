import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { rejectInvitation } from "../services/invitation.service";

export default function useRejectInvitation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: rejectInvitation,

        onSuccess: () => {

            toast.success("Invitation Rejected");

            queryClient.invalidateQueries({

                queryKey: ["invitations"]

            });

        }

    });

}