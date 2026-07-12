import User from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Generate Tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save Refresh Token in Database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
        accessToken,
        refreshToken
    };
};

export default generateAccessAndRefreshTokens;