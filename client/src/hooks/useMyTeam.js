import { useQuery } from "@tanstack/react-query";
import { getMyTeam } from "../services/team.service";

export default function useMyTeam() {

    return useQuery({

        queryKey: ["my-team"],

        queryFn: getMyTeam,

        retry:false,

        staleTime:0,

        gcTime:0,

        refetchOnMount:"always"

    });

}