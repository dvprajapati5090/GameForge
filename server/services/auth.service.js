import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateAccessAndRefreshTokens from "../utils/generateTokens.js";

export const registerUserService = async (userData) => {

    const {
        username,
        displayName,
        email,
        password,
        role
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

    // Create new user
    const user = await User.create({
        username,
        displayName,
        email,
        password,
        role
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