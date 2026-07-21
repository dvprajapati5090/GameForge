import { z } from "zod";

export const submitMatchResultSchema = z.object({

    winnerId: z
        .string()
        .min(1, "Winner is required"),

    scoreA: z
        .number()
        .int()
        .min(0),

    scoreB: z
        .number()
        .int()
        .min(0)

});