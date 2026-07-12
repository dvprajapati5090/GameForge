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

export const getPublicProfileService = async (username) => {

    const user = await User.findOne({ username })
        .select(`
            -_id
            username
            displayName
            avatar
            bio
            riotGameName
            riotTagLine
            region
            preferredRole
            currentRank
            team
            `)

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    return user;
};

export const searchPlayersService = async (query, currentUserId) => {

    const searchQuery = query?.trim();

    if (!searchQuery) {
        throw new ApiError(
            400,
            "Search query is required"
        );
    }

    const players = await User.find({
        _id: {
            $ne: currentUserId
        },
        role: "PLAYER",
        $or: [
            {
                username: {
                    $regex: `^${searchQuery}`,
                    $options: "i"
                }
            },
            {
                displayName: {
                    $regex: searchQuery,
                    $options: "i"
                }
            }
        ]
    })
        .select(
            "-_id username displayName avatar preferredRole currentRank"
        )
        .sort({
            username: 1
        })
        .limit(10);

    return players;
};