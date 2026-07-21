import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {

    updateMatchWinnerService

} from "../services/match.service.js";

export const updateWinner = async (req, res) => {

    const { id } = req.params;

    const {

        winnerId,

        scoreA,

        scoreB

    } = req.body;

    const match = await updateMatchWinnerService(

        id,

        winnerId,

        scoreA,

        scoreB,

        req.user._id

    );

    res.status(200).json({

        success: true,

        message: "Match updated successfully",

        data: match

    });

};