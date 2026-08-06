import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateAccessAndRefreshTokens from "../utils/generateTokens.js";

import Team from "../models/team.model.js";
import Tournament from "../models/tournament.model.js";
import Match from "../models/match.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
    getAccountDetails,
    getMMRDetails
} from "./thirdParty/henrik.service.js";

import crypto from "crypto";

import {
    sendVerificationEmail,
    sendPasswordResetEmail
} from "./email.service.js";

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
        region,
        googleId,
        avatar,
        authProvider,
        securityQuestion,
        securityAnswer

    } = userData;

    const provider = authProvider || "LOCAL";

    // Check username
    const existingUsername = await User.findOne({
        username
    });

    if (existingUsername) {

        throw new ApiError(
            409,
            "Username already exists"
        );

    }

    // Check email
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

    // Riot verification only for PLAYER
    if (role === "PLAYER") {

        riotData = await verifyRiotAccountService({

            gameName,
            tagLine,
            region

        });

    }

    const userPayload = {

        username,

        displayName,

        email,

        role,

        authProviders: [

            provider

        ],

        ...(provider === "GOOGLE" && {

            googleId,

            avatar,

            emailVerified: true

        }),

        ...(provider === "LOCAL" && {

            password,

            emailVerified: false,

            ...(securityQuestion && securityAnswer && {

                securityQuestion,

                securityAnswer: await bcrypt.hash(securityAnswer.toLowerCase().trim(), 10)

            })

        }),

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

    };

    // Create user
    const user = await User.create(userPayload);

    // LOCAL Registration
    if (provider === "LOCAL") {

        await sendVerificationEmail(user);

        return {

            requiresEmailVerification: true,

            message:
                "Registration successful. Please verify your email."

        };

    }

    // GOOGLE Registration
    const {

        accessToken,

        refreshToken

    } = await generateAccessAndRefreshTokens(

        user._id

    );

    const createdUser = await User.findById(

        user._id

    ).select(

        "-password -refreshToken -emailVerificationToken"

    );

    return {

        requiresEmailVerification: false,

        user: createdUser,

        accessToken,

        refreshToken

    };

};

export const loginUserService = async ({ email, password }) => {

    // Find user with password
    const user = await User.findOne({

        email

    }).select("+password");

    if (!user) {

        throw new ApiError(

            401,

            "Invalid email or password"

        );

    }

    // Google-only account
    if (

        !user.authProviders.includes("LOCAL")

    ) {

        throw new ApiError(

            400,

            "This account uses Google Sign-In. Please continue with Google."

        );

    }

    // Email not verified
    if (!user.emailVerified) {

        throw new ApiError(

            403,

            "Please verify your email before logging in."

        );

    }

    // Compare password
    const isPasswordValid = await user.isPasswordCorrect(

        password

    );

    if (!isPasswordValid) {

        throw new ApiError(

            401,

            "Invalid email or password"

        );

    }

    // Generate Tokens
    const {

        accessToken,

        refreshToken

    } = await generateAccessAndRefreshTokens(

        user._id

    );

    // Remove sensitive fields
    const loggedInUser = await User.findById(

        user._id

    ).select(

        "-password -refreshToken"

    );

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

        throw new ApiError(

            401,

            "Refresh token missing"

        );

    }

    let decoded;

    try {

        decoded = jwt.verify(

            refreshToken,

            process.env.JWT_REFRESH_SECRET

        );

    }

    catch (error) {

        if (error.name === "TokenExpiredError") {

            throw new ApiError(

                401,

                "Refresh token expired"

            );

        }

        throw new ApiError(

            401,

            "Invalid refresh token"

        );

    }

    const user = await User.findById(
        decoded._id
    );

    if (!user) {

        throw new ApiError(

            404,

            "User not found"

        );

    }

    if (user.refreshToken !== refreshToken) {

        throw new ApiError(

            401,

            "Refresh token mismatch"

        );

    }

    const accessToken =
        user.generateAccessToken();

    const newRefreshToken =
        user.generateRefreshToken();

    user.refreshToken =
        newRefreshToken;

    await user.save({

        validateBeforeSave: false

    });

    return {

        accessToken,

        refreshToken:
            newRefreshToken

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

    const user = await User.findById(userId)
        .select("+password");

    if (!user) {

        throw new ApiError(
            404,
            "User not found"
        );

    }

    // Google-only accounts cannot change password
    if (

        user.authProviders.includes("GOOGLE") &&
        !user.authProviders.includes("LOCAL")

    ) {

        throw new ApiError(

            400,

            "This account uses Google Sign-In. Password changes are managed through Google."

        );

    }

    const valid = await user.isPasswordCorrect(

        currentPassword

    );

    if (!valid) {

        throw new ApiError(

            400,

            "Current password is incorrect"

        );

    }

    user.password = newPassword;

    user.refreshToken = "";

    await user.save();

};

export const deleteAccountService = async (

    userId,

    password

) => {

    const user = await User.findById(userId)

        .select("+password");

    if (!user) {

        throw new ApiError(

            404,

            "User not found."

        );

    }

    const requiresPassword =
        user.authProviders.includes("LOCAL");

    if (requiresPassword) {

        if (!password) {

            throw new ApiError(
                400,
                "Password is required"
            );

        }

        const valid =
            await user.isPasswordCorrect(password);

        if (!valid) {

            throw new ApiError(
                400,
                "Incorrect password"
            );

        }

    }

    if (user.team) {

        const team = await Team.findById(user.team);

        if (team) {

            if (

                team.captain.toString() ===

                user._id.toString()

            ) {

                await User.updateMany(

                    {

                        _id: {

                            $in: team.members

                        }

                    },

                    {

                        $set: {

                            team: null

                        }

                    }

                );

                await Team.findByIdAndDelete(

                    team._id

                );

            }

            else {

                team.members = team.members.filter(

                    (member) =>

                        member.toString() !==

                        user._id.toString()

                );

                await team.save();

            }

        }

    }

    await User.findByIdAndUpdate(

        user._id,

        {

            $set: {

                team: null,

                refreshToken: ""

            }

        }

    );

    // If the deleted user is a HOST, remove everything created by them

    const tournaments = await Tournament.find({
        organizer: user._id
    });

    const tournamentIds = tournaments.map(
        tournament => tournament._id
    );

    // Remove tournament registrations from teams
    await Team.updateMany(
        {},
        {
            $pull: {
                tournaments: {
                    $in: tournamentIds
                }
            }
        }
    );

    // Delete all matches of those tournaments
    await Match.deleteMany({
        tournament: {
            $in: tournamentIds
        }
    });

    // Delete the tournaments themselves
    await Tournament.deleteMany({
        _id: {
            $in: tournamentIds
        }
    });

    await User.findByIdAndDelete(

        user._id

    );

};

export const verifyEmailService = async (token) => {

    if (!token) {
        throw new ApiError(
            400,
            "Verification token is missing"
        );
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({

        emailVerificationToken: hashedToken,

        emailVerificationExpires: {
            $gt: Date.now()
        }

    });

    if (!user) {

        throw new ApiError(
            400,
            "Verification link is invalid or has expired"
        );

    }

    user.emailVerified = true;

    user.emailVerificationToken = "";

    user.emailVerificationExpires = null;

    await user.save({
        validateBeforeSave: false
    });

    return;
};

export const forgotPasswordService = async ({ email, securityAnswer }) => {
    if (!email) throw new ApiError(400, 'Email is required');

    const user = await User.findOne({ email: email.toLowerCase() }).select('+securityAnswer');

    if (!user) {
        // Return success even if user not found (security: don't reveal if email exists)
        return { message: 'If that email is registered, a reset link has been sent.' };
    }

    if (!user.authProviders.includes('LOCAL')) {
        throw new ApiError(400, 'This account uses Google Sign-In. Please reset your password through Google.');
    }

    // Security question must exist
    if (!user.securityQuestion || !user.securityAnswer) {

        throw new ApiError(
            400,
            "Security question has not been set for this account."
        );

    }

    // Security answer is required
    if (!securityAnswer) {

        throw new ApiError(
            400,
            "Security answer is required."
        );

    }

    const isCorrect = await bcrypt.compare(

        securityAnswer.toLowerCase().trim(),

        user.securityAnswer

    );

    if (!isCorrect) {

        throw new ApiError(

            400,

            "Incorrect security answer."

        );

    }

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user, resetUrl);

    return { message: 'If that email is registered, a reset link has been sent.' };
};

export const getSecurityQuestionService = async (email) => {
    if (!email) throw new ApiError(400, 'Email is required');

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.authProviders.includes('LOCAL')) {
        // Don't reveal if user exists
        return { question: null, found: false };
    }

    return { question: user.securityQuestion || null, found: true };
};

export const resetPasswordService = async ({ token, newPassword }) => {
    if (!token) throw new ApiError(400, 'Reset token is missing');
    if (!newPassword || newPassword.length < 8) throw new ApiError(400, 'Password must be at least 8 characters');

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) throw new ApiError(400, 'Reset link is invalid or has expired. Please request a new one.');

    user.password = newPassword;
    user.passwordResetToken = '';
    user.passwordResetExpires = null;
    user.refreshToken = '';
    await user.save();

    return { message: 'Password reset successfully. Please login with your new password.' };
};

export const saveSecurityQuestionService = async (userId, { securityQuestion, securityAnswer }) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User not found');

    user.securityQuestion = securityQuestion;
    user.securityAnswer = await bcrypt.hash(securityAnswer.toLowerCase().trim(), 10);
    await user.save({ validateBeforeSave: false });

    return { message: 'Security question saved.' };
};