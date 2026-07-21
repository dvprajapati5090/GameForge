import { useQuery } from "@tanstack/react-query";

import { getMatches } from "../services/tournament.service";

export default function useMatches(id) {

    return useQuery({

        queryKey: ["matches", id],

        queryFn: () => getMatches(id),

        enabled: !!id,

        staleTime: 60000

    });

}