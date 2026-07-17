import { useQuery } from "@tanstack/react-query";

import { getPlayer } from "../services/player.service";

export default function usePlayer(username) {

    return useQuery({

        queryKey: ["player", username],

        queryFn: () => getPlayer(username),

        enabled: !!username

    });

}