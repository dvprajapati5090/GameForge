import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { generateBracket } from "../services/tournament.service";

export default function useGenerateBracket() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: generateBracket,

        onSuccess: (_, id) => {

            toast.success("Bracket generated successfully");

            queryClient.invalidateQueries({
                queryKey: ["bracket", id]
            });

            queryClient.invalidateQueries({
                queryKey: ["tournament", id]
            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Failed to generate bracket"
            );

        }

    });

}