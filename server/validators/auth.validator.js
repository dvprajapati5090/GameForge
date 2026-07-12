import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(
            /^[a-zA-Z0-9._-]+$/,
            "Username can only contain letters, numbers, '.', '_' and '-'"
        ),

    displayName: z
        .string()
        .trim()
        .min(3, "Display Name must be at least 3 characters")
        .max(30, "Display Name cannot exceed 30 characters"),

    email: z
        .string()
        .email("Invalid email address")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),

    role: z.enum(["PLAYER", "HOST"])
});

export const loginSchema = z.object({
    email: z
        .email("Invalid email address")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(1, "Password is required")
});