import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    deleteTournament,
    completeTournament,
    generateBracket
} from "../services/tournament.service";

export default function useTournamentMutations(id) {

    const queryClient = useQueryClient();

    const invalidate = () => {

        queryClient.invalidateQueries({
            queryKey: ["tournament", id]
        });

        queryClient.invalidateQueries({
            queryKey: ["tournaments"]
        });

    };

    const deleteMutation = useMutation({

        mutationFn: () => deleteTournament(id),

        onSuccess: invalidate

    });

    const bracketMutation = useMutation({

        mutationFn: () => generateBracket(id),

        onSuccess: invalidate

    });

    const completeMutation = useMutation({

        mutationFn: (winnerTeamId) =>
            completeTournament(id, winnerTeamId),

        onSuccess: invalidate

    });

    return {

        deleteMutation,

        bracketMutation,

        completeMutation

    };

}