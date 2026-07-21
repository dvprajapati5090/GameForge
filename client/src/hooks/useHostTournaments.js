import { useQuery } from "@tanstack/react-query";

import { getMyTournaments } from "../services/tournament.service";

export default function useHostTournaments() {

    return useQuery({

        queryKey: ["host-tournaments"],

        queryFn: getMyTournaments

    });

}