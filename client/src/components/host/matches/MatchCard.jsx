import { useMutation, useQueryClient } from "@tanstack/react-query";

import BracketMatch from "./BracketMatch";

import { updateMatch } from "../../../services/tournament.service";

export default function MatchCard({

    match

}) {

    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: winner =>

            updateMatch(

                match._id,

                {

                    winner

                }

            ),

        onSuccess: () =>

            queryClient.invalidateQueries({

                queryKey: ["bracket"]

            })

    });

    return (

        <BracketMatch

            match={match}

            onWinner={(winner)=>

                mutation.mutate(winner)

            }

        />

    );

}