import { useQuery } from "@tanstack/react-query";

import { getMessages } from "../services/chat.service";

export default function useTeamChat() {

    return useQuery({

        queryKey: ["team-chat"],

        queryFn: getMessages

    });

}