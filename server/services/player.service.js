import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

export const getAllPlayersService = async () => {

    const players = await User.find({
        role: "PLAYER"
    })

        .populate(
            "team",
            "name"
        )

        .select(
            `
            username
            displayName
            avatar
            riotGameName
            riotTagLine
            riotCard
            currentRank
            highestRank
            accountLevel
            preferredRole
            region
            team
            `
        )

        .sort({
            displayName: 1
        });

    return players;

};

export const getPlayerByUsernameService = async (username) => {

    const player = await User.findOne({
        username
    })

        .populate(
            "team",
            "name description logo"
        )

        .select("-password -refreshToken");

    if (!player) {

        throw new ApiError(
            404,
            "Player not found"
        );

    }

    return player;

};