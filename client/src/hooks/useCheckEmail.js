import { useQuery } from "@tanstack/react-query";

import useDebounce from "./useDebounce";

import {

    checkEmailAvailability

} from "../services/auth.service";

export default function useCheckEmail(email) {

    const debouncedEmail = useDebounce(email);

    return useQuery({

        queryKey: [

            "email",

            debouncedEmail

        ],

        queryFn: () =>

            checkEmailAvailability(debouncedEmail),

        enabled:

            debouncedEmail.includes("@"),

        staleTime: 60000

    });

}