import { z } from "zod";

export const createTournamentSchema = z.object({

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

    banner: z
        .string()
        .optional(),

    maxTeams: z
        .number()
        .refine(
            value => [4, 8, 16, 32, 64, 128].includes(value),
            {
                message: "Max teams must be one of 4, 8, 16, 32, 64 or 128"
            }
        ),

    registrationStart: z.string(),

    registrationEnd: z.string(),

    tournamentStart: z.string(),

    prizePool: z
        .number()
        .nonnegative()
        .optional(),

    rules: z
        .string()
        .optional()

});

export const updateTournamentSchema = createTournamentSchema.partial();

export const completeTournamentSchema = z.object({
    winnerTeamId: z
        .string()
        .min(1, "Winner team is required")
});