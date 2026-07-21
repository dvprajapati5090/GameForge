import express from "express";

import verifyJWT,{
    authorizeRoles
} from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { submitMatchResultSchema } from "../validators/match.validator.js";

import {

    updateWinner

} from "../controllers/match.controller.js";

const router = express.Router();

router.patch(

    "/:id",

    verifyJWT,

    authorizeRoles("HOST"),

    validate(submitMatchResultSchema),

    updateWinner

);

export default router;
