import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

import { 
    getAccountDetails,
    getMMRDetails
} from "./thirdParty/henrik.service.js";

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
        favoriteGames: updateData.favoriteGames,
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

export const syncRiotProfileService = async (userId) => {

    // Find User
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    // Check Riot ID
    if (!user.riotGameName || !user.riotTagLine) {
        throw new ApiError(
            400,
            "Please add your Riot Game Name and Tag Line first."
        );
    }

    // Fetch data from Henrik API
    const riotAccount = await getAccountDetails(
        user.riotGameName,
        user.riotTagLine
    );

    const mmr = await getMMRDetails(
        riotAccount.region,
        user.riotGameName,
        user.riotTagLine
    );

    // Update user
    user.puuid = riotAccount.puuid;
    user.region = riotAccount.region;
    user.accountLevel = riotAccount.account_level;

    user.currentRank =
        mmr.current_data?.currenttierpatched?.toUpperCase() || "";

    user.rankRating =
        mmr.current_data?.ranking_in_tier || 0;

    user.elo =
        mmr.current_data?.elo || 0;

    user.highestRank =
        mmr.highest_rank?.patched_tier.toUpperCase() || "";

    user.riotCard = riotAccount.card;
    user.riotTitle = riotAccount.title;
    user.riotVerified = true;
    user.syncStatus = "SYNCED";
    user.riotLastSyncedAt = new Date();

    await user.save();

    const updatedUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return updatedUser;
};