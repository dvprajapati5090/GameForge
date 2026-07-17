import { useQuery } from "@tanstack/react-query";

import useDebounce from "./useDebounce";

import {

    checkUsernameAvailability

} from "../services/auth.service";

export default function useCheckUsername(username) {

    const debouncedUsername = useDebounce(username);

    return useQuery({

        queryKey: [

            "username",

            debouncedUsername

        ],

        queryFn: () =>

            checkUsernameAvailability(debouncedUsername),

        enabled:

            debouncedUsername.trim().length >= 3,

        staleTime: 60000

    });

}