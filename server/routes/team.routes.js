import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createTeamSchema,
    updateTeamSchema,
    invitePlayerSchema
} from "../validators/team.validator.js";

import {
    createTeam,
    getMyTeam,
    updateTeam,
    invitePlayer,
    getMyInvitations,
    acceptInvitation
} from "../controllers/team.controller.js";

const router = express.Router();

router.post(
    "/",
    verifyJWT,
    authorizeRoles("PLAYER"),
    validate(createTeamSchema),
    createTeam
);

router.get(
    "/my-team",
    verifyJWT,
    authorizeRoles("PLAYER"),
    getMyTeam
);

router.patch(
    "/",
    verifyJWT,
    authorizeRoles("PLAYER"),
    validate(updateTeamSchema),
    updateTeam
);

router.post(
    "/invite",
    verifyJWT,
    authorizeRoles("PLAYER"),
    validate(invitePlayerSchema),
    invitePlayer
);

router.get(
    "/invitations",
    verifyJWT,
    authorizeRoles("PLAYER"),
    getMyInvitations
);

router.post(
    "/invitations/:id/accept",
    verifyJWT,
    authorizeRoles("PLAYER"),
    acceptInvitation
);

export default router;