import { useQuery } from "@tanstack/react-query";
import { checkEligibility } from "../services/tournament.service";

export default function useTournamentEligibility(id) {

    return useQuery({

        queryKey: ["eligibility", id],

        queryFn: () => checkEligibility(id)

    });

}