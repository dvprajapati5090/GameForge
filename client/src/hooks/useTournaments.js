import { useQuery } from "@tanstack/react-query";
import { getTournaments } from "../services/tournament.service";

export default function useTournaments(params = {}) {

    return useQuery({

        queryKey: ["tournaments", params],

        queryFn: () => getTournaments(params),

        keepPreviousData: true

    });

}