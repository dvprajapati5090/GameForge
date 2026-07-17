import { useMutation } from "@tanstack/react-query";

import { verifyRiot } from "../services/auth.service";

export default function useVerifyRiot() {

    return useMutation({

        mutationFn: verifyRiot

    });

}