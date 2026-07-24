import { z } from "zod";

const tournamentBaseSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3)
        .max(100),

    game: z.enum([
        "VALORANT",
        "BGMI",
        "FREE_FIRE"
    ]),

    mode: z.enum([
        "SOLO",
        "DUO",
        "SQUAD",
        "5V5"
    ]),

    format: z.enum([
        "SINGLE_ELIMINATION",
        "DOUBLE_ELIMINATION"
    ]),

    description: z
        .string()
        .max(1000)
        .optional(),

    maxTeams: z
        .coerce
        .number()
        .refine(
            value => [4, 8, 16, 32, 64, 128].includes(value),
            {
                message:
                    "Max teams must be one of 4, 8, 16, 32, 64 or 128"
            }
        ),

    registrationStart: z.string(),

    registrationEnd: z.string(),

    tournamentStart: z.string(),

    isPaid: z
        .union([
            z.boolean(),
            z.string().transform(value => value === "true")
        ])
        .optional()
        .default(false),

    entryFee: z
        .coerce
        .number()
        .min(0)
        .optional()
        .default(0),

    prizePool: z
        .coerce
        .number()
        .min(0)
        .optional()
        .default(0),

    rules: z
        .string()
        .optional()

});

export const createTournamentSchema =
    tournamentBaseSchema.superRefine((data, ctx) => {

        if (
            data.isPaid &&
            data.entryFee <= 0
        ) {

            ctx.addIssue({

                code: z.ZodIssueCode.custom,

                path: ["entryFee"],

                message:
                    "Entry fee must be greater than 0"

            });

        }

    });

export const updateTournamentSchema =
    tournamentBaseSchema.partial();

export const completeTournamentSchema =
    z.object({

        winnerTeamId: z
            .string()
            .min(
                1,
                "Winner team is required"
            )

    });