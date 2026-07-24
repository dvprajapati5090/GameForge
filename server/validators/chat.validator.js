import { z } from "zod";

export const sendMessageSchema = z.object({

    text: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(1000, "Message is too long")

});