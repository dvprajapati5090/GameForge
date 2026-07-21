import { useQuery } from "@tanstack/react-query";

import { getTournament } from "../services/tournament.service";

export default function useTournament(id) {

    return useQuery({

        queryKey: ["tournament", id],

        queryFn: () => getTournament(id)

    });

}