import Tournament from "../models/tournament.model.js";
import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";

import ApiError from "../utils/ApiError.js";
import razorpay from "../utils/razorpay.js";

import crypto from "crypto";

import {
    registerTeamService
} from "./tournament.service.js";

export const createOrderService = async (

    userId,

    tournamentId

) => {

    // Find player
    const user = await User.findById(userId)
        .select("+team");

    if (!user) {

        throw new ApiError(
            404,
            "User not found"
        );

    }

    if (!user.team) {

        throw new ApiError(
            400,
            "You must have a team to register"
        );

    }

    // Find tournament
    const tournament = await Tournament.findById(
        tournamentId
    );

    if (!tournament) {

        throw new ApiError(
            404,
            "Tournament not found"
        );

    }

    if (!tournament.isPaid) {

        throw new ApiError(
            400,
            "This tournament is free"
        );

    }

    if (
        tournament.status !== "REGISTRATION_OPEN"
    ) {

        throw new ApiError(
            400,
            "Registration is closed"
        );

    }

    // Team already registered?
    const alreadyRegistered =
        tournament.registeredTeams.some(

            teamId =>
                teamId.toString() ===
                user.team.toString()

        );

    if (alreadyRegistered) {

        throw new ApiError(
            409,
            "Your team is already registered"
        );

    }

    // Tournament Full
    if (

        tournament.registrationCount >=

        tournament.maxTeams

    ) {

        throw new ApiError(

            400,

            "Tournament is full"

        );

    }

    // Create Razorpay Order
    const order = await razorpay.orders.create({

        amount:

            tournament.entryFee * 100,

        currency: "INR",

        receipt:

            `gf_${Date.now()}`

    });

    // Save Payment
    const payment = await Payment.create({

        user: user._id,

        team: user.team,

        tournament: tournament._id,

        amount: tournament.entryFee,

        currency: "INR",

        razorpayOrderId: order.id,

        status: "CREATED"

    });

    return {

        paymentId: payment._id,

        orderId: order.id,

        amount: order.amount,

        currency: order.currency,

        key: process.env.RAZORPAY_KEY_ID

    };

};

export const verifyPaymentService = async (

    userId,

    {

        paymentId,

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

    }

) => {

    const payment = await Payment.findById(paymentId);

    if (!payment) {

        throw new ApiError(
            404,
            "Payment not found"
        );

    }

    if (payment.status === "SUCCESS") {

        throw new ApiError(
            400,
            "Payment already verified"
        );

    }

    const generatedSignature = crypto

        .createHmac(

            "sha256",

            process.env.RAZORPAY_KEY_SECRET

        )

        .update(

            `${razorpay_order_id}|${razorpay_payment_id}`

        )

        .digest("hex");

    if (generatedSignature !== razorpay_signature) {

        payment.status = "FAILED";

        await payment.save();

        throw new ApiError(
            400,
            "Invalid payment signature"
        );

    }

    payment.status = "SUCCESS";

    payment.razorpayPaymentId = razorpay_payment_id;

    payment.razorpaySignature = razorpay_signature;

    await payment.save();

    // Register the team only after successful verification
    await registerTeamService(

        payment.tournament,

        userId

    );

    return payment;

};