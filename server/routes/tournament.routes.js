import express from "express";

import validate from "../middleware/validate.middleware.js";

import verifyJWT, {
    authorizeRoles
} from "../middleware/auth.middleware.js";

import {
    createTournamentSchema,
    updateTournamentSchema,
    completeTournamentSchema
} from "../validators/tournament.validator.js";

import {
    createTournament,
    getTournamentById,
    getAllTournaments,
    updateTournament,
    deleteTournament,
    registerTeam,
    withdrawTeam,
    completeTournament,
    getBracket,
    generateBracket,
    getMyTournaments,
    checkTournamentEligibility
} from "../controllers/tournament.controller.js";

const router = express.Router();

router.post(
    "/",
    verifyJWT,
    authorizeRoles("HOST"),
    validate(createTournamentSchema),
    createTournament
);

router.get(
    "/",
    getAllTournaments
);

router.get(

    "/:id/bracket",

    getBracket

);

router.get(
    "/host/my",
    verifyJWT,
    authorizeRoles("HOST"),
    getMyTournaments
);

router.get(
    "/:id",
    getTournamentById
);

router.patch(
    "/:id",
    verifyJWT,
    authorizeRoles("HOST"),
    validate(updateTournamentSchema),
    updateTournament
);

router.delete(
    "/:id",
    verifyJWT,
    authorizeRoles("HOST"),
    deleteTournament
);

router.post(
    "/:id/register",
    verifyJWT,
    authorizeRoles("PLAYER"),
    registerTeam
);

router.delete(
    "/:id/register",
    verifyJWT,
    authorizeRoles("PLAYER"),
    withdrawTeam
);

router.post(
    "/:id/generate-bracket",
    verifyJWT,
    authorizeRoles("HOST"),
    generateBracket
);

router.patch(
    "/:id/complete",
    verifyJWT,
    authorizeRoles("HOST"),
    validate(completeTournamentSchema),
    completeTournament
);

router.patch(

    "/:id/withdraw",

    verifyJWT,

    authorizeRoles("PLAYER"),

    withdrawTeam

);

router.get(

    "/:id/eligibility",

    verifyJWT,

    authorizeRoles("PLAYER"),

    checkTournamentEligibility

);

export default router;