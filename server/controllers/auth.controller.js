import {
    registerUserService,
    loginUserService,
    logoutUserService,
    refreshAccessTokenService
} from "../services/auth.service.js";

import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";

export const registerUser = asyncHandler(async (req, res) => {

    const {
        user,
        accessToken,
        refreshToken
    } = await registerUserService(req.body);

    return res
        .status(201)
        .cookie(
            "refreshToken",
            refreshToken,
            cookieOptions
        )
        .json(
            new ApiResponse(
                "User registered successfully",
                {
                    user,
                    accessToken
                }
            )
        );
});

export const loginUser = asyncHandler(async (req, res) => {

    const {
        user,
        accessToken,
        refreshToken
    } = await loginUserService(req.body);

    return res
        .status(200)
        .cookie(
            "refreshToken",
            refreshToken,
            cookieOptions
        )
        .json(
            new ApiResponse(
                "Login successful",
                {
                    user,
                    accessToken
                }
            )
        );

});

export const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            "Current User",
            req.user
        )
    );

});

export const logoutUser = asyncHandler(async (req, res) => {

    await logoutUserService(req.user._id);

    return res
        .status(200)
        .clearCookie(
            "refreshToken",
            cookieOptions
        )
        .json(
            new ApiResponse(
                "Logged out successfully"
            )
        );

});

export const refreshAccessToken = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    const {
        accessToken,
        refreshToken: newRefreshToken
    } = await refreshAccessTokenService(refreshToken);

    return res
        .status(200)
        .cookie(
            "refreshToken",
            newRefreshToken,
            cookieOptions
        )
        .json(
            new ApiResponse(
                "Access token refreshed successfully",
                {
                    accessToken
                }
            )
        );

});