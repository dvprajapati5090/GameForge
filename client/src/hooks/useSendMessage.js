import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { sendMessage } from "../services/chat.service";

export default function useSendMessage() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: sendMessage,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["team-chat"]

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to send message"

            );

        }

    });

}