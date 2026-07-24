import { z } from "zod";

export const createOrderSchema = z.object({

    tournamentId: z
        .string()
        .min(1, "Tournament ID is required")

});

export const verifyPaymentSchema = z.object({

    paymentId: z.string(),

    razorpay_order_id: z.string(),

    razorpay_payment_id: z.string(),

    razorpay_signature: z.string()

});