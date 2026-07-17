import { useQuery } from "@tanstack/react-query";

import { getPlayers } from "../services/player.service";

export default function usePlayers(filters = {}) {

    return useQuery({

        queryKey: ["players", filters],

        queryFn: () => getPlayers(filters)

    });

}