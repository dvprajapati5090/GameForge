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

import asyncHandler from "../utils/asyncHandler.js";

import { 
    getAccountDetails,
    getMMRDetails 
} from "../services/thirdParty/henrik.service.js";

const router = express.Router();

router.get(
    "/",
    verifyJWT,
    getProfile
);

router.patch(
    "/",
    verifyJWT,
    validate(updateProfileSchema),
    updateProfile
);

router.get(
    "/search",
    verifyJWT,
    searchPlayers
);

router.get("/test-riot", async (req, res) => {

    const data = await getAccountDetails(
        "DushyantZZZ",
        "2007"
    );

    res.json(data);

});

router.post(
    "/sync-riot",
    verifyJWT,
    syncRiotProfile
);

router.get(
    "/test-riot-rank",
    asyncHandler(async (req, res) => {

        const data = await getMMRDetails(
            "ap",
            "jvdjvdjvd",
            "jvd"
        );

        return res.status(200).json(data);

    })
);

router.get(
    "/:username",
    getPublicProfile
);

export default router;