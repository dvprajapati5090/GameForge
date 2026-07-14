import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    getProfileService,
    updateProfileService,
    getPublicProfileService,
    searchPlayersService,
    syncRiotProfileService,
} from "../services/profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {

    const profile = await getProfileService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            profile,
            "Profile fetched successfully"
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
            200,
            updatedProfile,
            "Profile updated successfully"
        )
    );

});

export const getPublicProfile = asyncHandler(async (req, res) => {

    const profile = await getPublicProfileService(
        req.params.username
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            profile,
            "Public Profile fetched successfully"
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
            200,
            profile,
            "Players fetched successfully"
        )
    );

});

export const syncRiotProfile = asyncHandler(async (req, res) => {

    const updatedUser = await syncRiotProfileService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "Riot profile synced successfully"
        )
    );

});

export const testRiotRank = asyncHandler(async (req, res) => {

    const data = await getMMRDetails(
        "ap",
        "jvdjvdjvd",
        "jvd"
    );

    return res.status(200).json(data);

});