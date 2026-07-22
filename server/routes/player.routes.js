import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
    getAllPlayers,
    getPlayerByUsername,
    getPlayerCareer,
    getLeaderboard
} from "../controllers/player.controller.js";

const router = express.Router();

router.get(
    "/",
    verifyJWT,
    getAllPlayers
);

router.get(
    "/leaderboard",
    verifyJWT,
    getLeaderboard
);

router.get(
    "/:username",
    verifyJWT,
    getPlayerByUsername
);

router.get(
    "/:id/career",
    getPlayerCareer
);

export default router;