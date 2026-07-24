import { useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import {

    createOrder

} from "../services/payment.service";

export default function useCreatePaymentOrder() {

    return useMutation({

        mutationFn: createOrder,

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to create payment"

            );

        }

    });

}