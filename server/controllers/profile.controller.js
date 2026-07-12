import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    getProfileService,
    updateProfileService
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