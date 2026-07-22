import { useQuery } from "@tanstack/react-query";

import { getPlayerCareer } from "../services/player.service";

export default function usePlayerCareer(playerId) {

    return useQuery({

        queryKey: [

            "career",

            playerId

        ],

        queryFn: () =>

            getPlayerCareer(playerId),

        enabled: !!playerId

    });

}