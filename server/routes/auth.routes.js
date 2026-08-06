import express from "express";

import validate from "../middleware/validate.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";

import {
    registerSchema,
    loginSchema,
    verifyRiotSchema,
} from "../validators/auth.validator.js";

import { deleteAccountSchema } from "../validators/deleteAccount.validator.js";

import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    refreshAccessToken,
    verifyRiotAccount,
    checkEmailAvailability,
    checkUsernameAvailability,
    changePassword,
    deleteAccount,
    verifyEmail,
    getSecurityQuestion,
    forgotPassword,
    resetPassword,
    saveSecurityQuestion
} from "../controllers/auth.controller.js";

import { sendTestEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    registerUser
);

router.post(
    "/login",
    validate(loginSchema),
    loginUser
);

router.get(
    "/me",
    verifyJWT,
    getCurrentUser
);

router.post(
    "/logout",
    verifyJWT,
    logoutUser
);

router.post(
    "/refresh-token",
    refreshAccessToken
);

router.post(

    "/verify-riot",

    validate(verifyRiotSchema),

    verifyRiotAccount

);

router.get(

    "/check-username",

    checkUsernameAvailability

);

router.get(

    "/check-email",

    checkEmailAvailability

);

router.patch(
    "/change-password",
    verifyJWT,
    changePassword
);

router.delete(

    "/delete-account",

    verifyJWT,

    validate(deleteAccountSchema),

    deleteAccount

);

router.post(
    "/test-email",
    sendTestEmail
);

router.get(
    "/verify-email/:token",
    verifyEmail
);

router.get('/security-question', getSecurityQuestion);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.patch('/security-question', verifyJWT, saveSecurityQuestion);

export default router;