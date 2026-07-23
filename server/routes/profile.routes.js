import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    getProfile,
    updateProfile,
    getPublicProfile,
    searchPlayers,
    syncRiotProfile
} from "../controllers/profile.controller.js";

import { updateProfileSchema } from "../validators/profile.validator.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get(
    "/",
    verifyJWT,
    getProfile
);

router.patch(
    "/",
    verifyJWT,
    upload.single("avatar"),
    validate(updateProfileSchema),
    updateProfile
);

router.get(
    "/search",
    verifyJWT,
    searchPlayers
);

router.post(
    "/sync-riot",
    verifyJWT,
    syncRiotProfile
);

router.get(
    "/:username",
    getPublicProfile
);

export default router;
