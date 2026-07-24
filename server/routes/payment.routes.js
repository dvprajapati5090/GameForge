import express from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { verifyPayment } from "../controllers/payment.controller.js";

import {
    createOrder
} from "../controllers/payment.controller.js";

import {
    createOrderSchema,
    verifyPaymentSchema
} from "../validators/payment.validator.js";

const router = express.Router();

router.post(
    "/create-order",
    verifyJWT,
    authorizeRoles("PLAYER"),
    validate(createOrderSchema),
    createOrder
);

router.post(

    "/verify",

    verifyJWT,

    authorizeRoles("PLAYER"),

    validate(verifyPaymentSchema),

    verifyPayment

);

export default router;