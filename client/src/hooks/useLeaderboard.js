import { useQuery } from "@tanstack/react-query";

import { getLeaderboard } from "../services/player.service";

export default function useLeaderboard(params = {}) {

    return useQuery({

        queryKey: [

            "leaderboard",

            params

        ],

        queryFn: () => getLeaderboard(params)

    });

}