import { z } from "zod";

export const createTeamSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Team name must be at least 3 characters")
        .max(30, "Team name cannot exceed 30 characters"),

    description: z
        .string()
        .trim()
        .max(300, "Description cannot exceed 300 characters")
        .optional()
});

export const updateTeamSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3)
        .max(30)
        .optional(),

    description: z
        .string()
        .trim()
        .max(300)
        .optional()

})
.refine(
    (data)=>Object.keys(data).length > 0,
    {
        message:"At least one field must be provided"
    }
);

export const invitePlayerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
});