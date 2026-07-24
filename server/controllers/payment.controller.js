import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    createOrderService,
    verifyPaymentService
} from "../services/payment.service.js";

export const createOrder = asyncHandler(async (req, res) => {

    const order = await createOrderService(

        req.user._id,

        req.body.tournamentId

    );

    return res.status(201).json(

        new ApiResponse(

            "Order created successfully",

            order

        )

    );

});

export const verifyPayment = asyncHandler(

    async (req, res) => {

        const payment =

            await verifyPaymentService(

                req.user._id,

                req.body

            );

        return res.status(200).json(

            new ApiResponse(

                "Payment verified successfully",

                payment

            )

        );

    }

);