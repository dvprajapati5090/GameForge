import {
    registerUserService,
    loginUserService,
    logoutUserService,
    refreshAccessTokenService,
    verifyRiotAccountService,
    checkEmailAvailabilityService,
    checkUsernameAvailabilityService,
    changePasswordService,
    deleteAccountService,
    verifyEmailService
} from "../services/auth.service.js";

import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";

import { sendEmail } from "../services/email.service.js";
import testEmailTemplate from "../templates/test.template.js";

import { sendVerificationEmail } from "../services/email.service.js";

export const registerUser = asyncHandler(async (req, res) => {

    const result = await registerUserService(req.body);

    // LOCAL Registration
    if (result.requiresEmailVerification) {

        return res.status(201).json(

            new ApiResponse(

                201,

                null,

                result.message

            )

        );

    }

    // GOOGLE Registration
    const {

        user,

        accessToken,

        refreshToken

    } = result;

    const cookieOptions = {

        httpOnly: true,

        secure:
            process.env.NODE_ENV === "production",

        sameSite: "lax"

    };

    return res

        .status(201)

        .cookie(

            "refreshToken",

            refreshToken,

            cookieOptions

        )

        .json(

            new ApiResponse(

                201,

                {

                    user,

                    accessToken

                },

                "Registration successful"

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

export const verifyRiotAccount = asyncHandler(async (req, res) => {

    const riotData = await verifyRiotAccountService(req.body);

    return res.status(200).json(

        new ApiResponse(

            "Riot account verified successfully",

            riotData

        )

    );

});

export const checkUsernameAvailability = asyncHandler(async (req, res) => {

    const { username } = req.query;

    const result = await checkUsernameAvailabilityService(username);

    return res.status(200).json(

        new ApiResponse(

            "Username availability checked",

            result

        )

    );

});

export const checkEmailAvailability = asyncHandler(async (req, res) => {

    const { email } = req.query;

    const result = await checkEmailAvailabilityService(email);

    return res.status(200).json(

        new ApiResponse(

            "Email availability checked",

            result

        )

    );

});

export const changePassword = asyncHandler(async (req, res) => {

    await changePasswordService(
        req.user._id,
        req.body
    );

    return res.status(200).json(

        new ApiResponse(

            200,

            null,

            "Password updated successfully"

        )

    );

});

export const deleteAccount = asyncHandler(async (req, res) => {

    await deleteAccountService(

        req.user._id,

        req.body.password

    );

    res

        .clearCookie(

            "refreshToken"

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            null,

            "Account deleted successfully."

        )

    );

});

export const sendTestEmail = asyncHandler(async (req, res) => {

    await sendEmail({

        to: req.body.email,

        subject: "GameForge Email Test",

        html: testEmailTemplate("Developer")

    });

    return res.status(200).json(

        new ApiResponse(

            "Email sent successfully"

        )

    );

});

export const verifyEmail = asyncHandler(async (req, res) => {

    const { token } = req.params;

    await verifyEmailService(token);

    return res.status(200).json(

        new ApiResponse(

            200,

            null,

            "Email verified successfully"

        )

    );

});