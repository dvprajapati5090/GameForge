import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    getAllPlayersService,
    getPlayerByUsernameService
} from "../services/player.service.js";

export const getAllPlayers = asyncHandler(async (req, res) => {

    const players = await getAllPlayersService(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            players,
            "Players fetched successfully"
        )
    );

});

export const getPlayerByUsername = asyncHandler(async (req, res) => {

    const player = await getPlayerByUsernameService(
        req.params.username
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            player,
            "Player fetched successfully"
        )
    );

});