import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMatch } from "../services/match.service";

export default function useUpdateMatch() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateMatch,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["bracket"]
            });

        },

        onError: (error) => {

            console.error("MATCH UPDATE ERROR");

            console.error(error);

            console.error(error?.response);

            console.error(error?.response?.data);

        }

    });

}