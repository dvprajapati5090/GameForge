import { useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { verifyPayment } from "../services/payment.service";

export default function useVerifyPayment() {

    return useMutation({

        mutationFn: verifyPayment,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["tournament"]

            });

            toast.success(
                "Tournament registered successfully!"
            );

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Payment verification failed"

            );

        }

    });

}