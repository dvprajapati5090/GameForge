import { useMutation, useQueryClient } from "@tanstack/react-query";

import { withdrawTournament } from "../services/tournament.service";

import toast from "react-hot-toast";

export default function useWithdrawTournament() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: withdrawTournament,

        onSuccess: () => {

            toast.success("Team withdrawn");

            queryClient.invalidateQueries({

                queryKey: ["tournament"]

            });

            queryClient.invalidateQueries({

                queryKey: ["tournaments"]

            });

        }

    });

}