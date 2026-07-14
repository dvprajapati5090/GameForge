import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

export const registerSchema = z.object({
    username: z
        .string()
        .min(3)
        .max(20),

    displayName: z
        .string()
        .min(3)
        .max(30),

    email: z
        .string()
        .email(),

    password: z
        .string()
        .min(8)
});