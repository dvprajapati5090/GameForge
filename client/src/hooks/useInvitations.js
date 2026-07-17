import { useQuery } from "@tanstack/react-query";

import { getMyInvitations } from "../services/invitation.service";

export default function useInvitations() {

    return useQuery({

        queryKey: ["invitations"],

        queryFn: getMyInvitations,

        staleTime: 30000

    });

}