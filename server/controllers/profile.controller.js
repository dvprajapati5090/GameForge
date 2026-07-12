import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    getProfileService,
    updateProfileService,
    getPublicProfileService,
    searchPlayersService
} from "../services/profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {

    const profile = await getProfileService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            "Profile fetched successfully",
            profile
        )
    );

});

export const updateProfile = asyncHandler(async (req, res) => {

    const updatedProfile = await updateProfileService(
        req.user._id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            "Profile updated successfully",
            updatedProfile
        )
    );

});

export const getPublicProfile = asyncHandler(async (req, res) => {

    const profile = await getPublicProfileService(
        req.params.username
    );

    return res.status(200).json(
        new ApiResponse(
            "Public profile fetched successfully",
            profile
        )
    );

});

export const searchPlayers = asyncHandler(async (req, res) => {

    const players = await searchPlayersService(
        req.query.query,
        req.user?._id
    );

    return res.status(200).json(
        new ApiResponse(
            "Players fetched successfully",
            players
        )
    );

});