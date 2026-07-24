import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    getMessages,
    sendMessage
} from "../controllers/teamChat.controller.js";

import {
    sendMessageSchema
} from "../validators/teamChat.validator.js";

const router = express.Router();

router.get(
    "/",
    verifyJWT,
    authorizeRoles("PLAYER"),
    getMessages
);

router.post(
    "/",
    verifyJWT,
    authorizeRoles("PLAYER"),
    validate(sendMessageSchema),
    sendMessage
);

export default router;