import express from "express";

import validate from "../middleware/validate.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";

import {
    registerSchema,
    loginSchema
} from "../validators/auth.validator.js";

import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
} from "../controllers/auth.controller.js";

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

export default router;