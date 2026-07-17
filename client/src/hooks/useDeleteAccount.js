import { useMutation } from "@tanstack/react-query";

import { deleteAccount } from "../services/auth.service";

export default function useDeleteAccount() {

    return useMutation({

        mutationFn: deleteAccount

    });

}