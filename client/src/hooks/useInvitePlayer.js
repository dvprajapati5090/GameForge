import { useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { invitePlayer } from "../services/team.service";

export default function useInvitePlayer() {

    return useMutation({

        mutationFn: invitePlayer,

        onSuccess: () => {

            toast.success("Invitation sent!");

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to send invitation"

            );

        }

    });

}