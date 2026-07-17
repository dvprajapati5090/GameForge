import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
    getAllPlayers,
    getPlayerByUsername
} from "../controllers/player.controller.js";

const router = express.Router();

router.get(
    "/",
    verifyJWT,
    getAllPlayers
);

router.get(
    "/:username",
    verifyJWT,
    getPlayerByUsername
);

export default router;