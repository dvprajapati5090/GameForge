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
    acceptInvitation,
    rejectInvitation,
    leaveTeam,
    removeMember,
    transferCaptain
} from "../controllers/team.controller.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/",
    verifyJWT,
    authorizeRoles("PLAYER"),
    upload.single("logo"),
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
    upload.single("logo"),
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

router.post(
    "/invitations/:id/reject",
    verifyJWT,
    authorizeRoles("PLAYER"),
    rejectInvitation
);

router.post(
    "/leave",
    verifyJWT,
    authorizeRoles("PLAYER"),
    leaveTeam
);

router.delete(
    "/members/:memberId",
    verifyJWT,
    authorizeRoles("PLAYER"),
    removeMember
);

router.patch(
    "/captain/:memberId",
    verifyJWT,
    authorizeRoles("PLAYER"),
    transferCaptain
);

export default router;