import { useQuery } from "@tanstack/react-query";

import { getMyTeam } from "../services/team.service";

export default function useTeam() {

    return useQuery({

        queryKey: ["team"],

        queryFn: getMyTeam,

        retry: false

    });

}