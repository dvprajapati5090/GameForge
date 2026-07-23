import { z } from "zod";

export const updateProfileSchema = z.object({

    displayName: z
        .string()
        .trim()
        .min(3)
        .max(30)
        .optional(),

    bio: z
        .string()
        .trim()
        .max(250)
        .optional(),

    favoriteGames: z.preprocess(

        (value) => {

            if (typeof value === "string") {

                try {

                    return JSON.parse(value);

                }

                catch {

                    return [];

                }

            }

            return value;

        },

        z.array(z.string()).optional()

    ),

    riotGameName: z
        .string()
        .trim()
        .max(20)
        .optional(),

    riotTagLine: z
        .string()
        .trim()
        .max(10)
        .optional(),

    preferredRole: z.enum([
        "DUELIST",
        "INITIATOR",
        "CONTROLLER",
        "SENTINEL",
        "FLEX"
    ]).optional()

});