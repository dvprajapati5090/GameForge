import {
    registerUserService,
    loginUserService
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