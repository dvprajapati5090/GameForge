import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getProfileService = async (userId) => {

    const user = await User.findById(userId)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    return user;

};

export const updateProfileService = async (userId, updateData) => {

    const allowedUpdates = {
        displayName: updateData.displayName,
        bio: updateData.bio,
        riotGameName: updateData.riotGameName,
        riotTagLine: updateData.riotTagLine,
        preferredRole: updateData.preferredRole
    };

    // Remove undefined values
    Object.keys(allowedUpdates).forEach((key) => {
        if (allowedUpdates[key] === undefined) {
            delete allowedUpdates[key];
        }
    });

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: allowedUpdates
        },
        {
            new: true,
            runValidators: true
        }
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    return updatedUser;
};