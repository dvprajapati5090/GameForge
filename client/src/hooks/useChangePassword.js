import { useMutation } from "@tanstack/react-query";

import { changePassword } from "../services/auth.service";

export default function useChangePassword() {

    return useMutation({

        mutationFn: changePassword

    });

}