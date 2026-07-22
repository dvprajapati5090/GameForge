import { useEffect } from "react";

import {
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import { getMyTeam } from "../services/team.service";

import socket from "../socket/socket";

export default function useTeam() {

    const queryClient = useQueryClient();

    const query = useQuery({

        queryKey: ["team"],

        queryFn: getMyTeam,

        retry: false

    });

    useEffect(() => {

        const handleTeamUpdated = () => {

            queryClient.invalidateQueries({

                queryKey: ["team"]

            });

        };

        socket.on(

            "teamUpdated",

            handleTeamUpdated

        );

        return () => {

            socket.off(

                "teamUpdated",

                handleTeamUpdated

            );

        };

    }, [queryClient]);

    return query;

}