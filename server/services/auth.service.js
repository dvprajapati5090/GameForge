import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateAccessAndRefreshTokens from "../utils/generateTokens.js";

import jwt from "jsonwebtoken";

import {
    getAccountDetails,
    getMMRDetails
} from "./thirdParty/henrik.service.js";

export const verifyRiotAccountService = async ({

    gameName,

    tagLine,

    region

}) => {

    const account = await getAccountDetails(

        gameName,

        tagLine

    );

    const mmr = await getMMRDetails(

        region,

        gameName,

        tagLine

    );

    return {

        verified: true,

        gameName,

        tagLine,

        region,

        puuid: account.puuid,

        level: account.account_level,

        playerCard: account.card,

        playerTitle: account.title,

        currentRank:
            mmr.current_data?.currenttierpatched?.toUpperCase() || "",

        rankRating:
            mmr.current_data?.ranking_in_tier || 0,

        elo:
            mmr.current_data?.elo || 0,

        highestRank:
            mmr.highest_rank?.patched_tier?.toUpperCase() || ""

    };

};

export const registerUserService = async (userData) => {

    const {

        username,

        displayName,

        email,

        password,

        role,

        gameName,

        tagLine,

        region

    } = userData;

    // Check if username already exists
    const existingUsername = await User.findOne({
        username
    });

    if (existingUsername) {
        throw new ApiError(
            409,
            "Username already exists"
        );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({
        email
    });

    if (existingEmail) {
        throw new ApiError(
            409,
            "Email already exists"
        );
    }

    let riotData = {};

    if (role === "PLAYER") {

        riotData = await verifyRiotAccountService({

            gameName,

            tagLine,

            region

        });

    }

    // Create new user
    const user = await User.create({

        username,

        displayName,

        email,

        password,

        role,

        ...(role === "PLAYER" && {

            riotGameName: riotData.gameName,

            riotTagLine: riotData.tagLine,

            region: riotData.region,

            puuid: riotData.puuid,

            riotVerified: riotData.verified,

            accountLevel: riotData.level,

            currentRank: riotData.currentRank,

            rankRating: riotData.rankRating,

            highestRank: riotData.highestRank,

            riotCard: riotData.playerCard,

            riotTitle: riotData.playerTitle,

            syncStatus: "SYNCED",

            riotLastSyncedAt: new Date()

        })

    });

    // Generate Access & Refresh Tokens
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    // Get user without sensitive fields
    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: createdUser,
        accessToken,
        refreshToken
    };
};

export const loginUserService = async ({ email, password }) => {

    // Find user with password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    // Compare password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    // Generate Tokens
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    // Get user without sensitive fields
    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: loggedInUser,
        accessToken,
        refreshToken
    };
};

export const logoutUserService = async (userId) => {

    await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                refreshToken: ""
            }
        },
        {
            new: true
        }
    );

};

export const refreshAccessTokenService = async (refreshToken) => {

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token missing");
    }

    let decoded;

    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
    } catch {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Refresh token is invalid");
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};

export const checkUsernameAvailabilityService = async (username) => {

    const existingUser = await User.findOne({
        username
    });

    return {
        available: !existingUser
    };

};

export const checkEmailAvailabilityService = async (email) => {

    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    return {
        available: !existingUser
    };

};

export const changePasswordService = async (

    userId,

    {

        currentPassword,

        newPassword

    }

) => {

    const user = await User.findById(userId).select("+password");

    const valid = await user.isPasswordCorrect(currentPassword);

    if (!valid) {

        throw new ApiError(

            400,

            "Current password is incorrect"

        );

    }

    user.password = newPassword;

    await user.save();

};