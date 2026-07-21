import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; // or your existing toast import
import { updateMatch } from "../services/match.service";

export default function useUpdateMatch() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateMatch,

        onSuccess: () => {

            toast.success(
                "🏆 Match result updated successfully!"
            );

            queryClient.invalidateQueries({
                queryKey: ["bracket"]
            });

        },

        onError: (err) => {

            toast.error(
                err.response?.data?.message ||
                "Couldn't update match."
            );

        }

    });

}