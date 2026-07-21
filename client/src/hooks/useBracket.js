import { useQuery } from "@tanstack/react-query";
import { getBracket } from "../services/tournament.service";

export default function useBracket(id) {

    return useQuery({

        queryKey: ["bracket", id],

        queryFn: () => getBracket(id),

        enabled: !!id

    });

}