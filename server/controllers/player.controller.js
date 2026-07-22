import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import { getPlayerCareerService, getLeaderboardService } from "../services/player.service.js";

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

export const getPlayerCareer = asyncHandler(

    async (req, res) => {

        const data = await getPlayerCareerService(

            req.params.id

        );

        return res.status(200).json(

            new ApiResponse(

                200,

                data,

                "Career fetched successfully"

            )

        );

    }

);

export const getLeaderboard = asyncHandler(

    async (req, res) => {

        const data = await getLeaderboardService(

            req.query

        );

        return res.status(200).json(

            new ApiResponse(

                200,

                data,

                "Leaderboard fetched successfully"

            )

        );

    }

);