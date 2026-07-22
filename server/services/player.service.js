import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import TournamentHistory from "../models/tournamentHistory.model.js";
import Match from "../models/match.model.js";

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

export const getPlayerCareerService = async (playerId) => {

    const player = await User.findById(playerId)
        .select("-password -refreshToken");

    if (!player) {
        throw new ApiError(404, "Player not found");
    }

    const history = await TournamentHistory.find({

        user: playerId

    })

        .populate("tournament", "name game banner")

        .populate("team", "name logo")

        .sort({ createdAt: -1 });

    const recentMatches = await Match.find({

        winner: { $ne: null },

        $or: [

            { teamA: player.team },

            { teamB: player.team }

        ]

    })

        .populate("teamA", "name logo")

        .populate("teamB", "name logo")

        .populate("winner", "name")

        .sort({ completedAt: -1 })

        .limit(10);

    const stats = player.stats;

    const winRate =

        stats.matchesPlayed === 0

            ? 0

            : Number(

                (

                    stats.wins /

                    stats.matchesPlayed

                ) * 100

            ).toFixed(1);

    return {

        player,

        stats: {

            ...stats.toObject(),

            winRate

        },

        history,

        recentMatches

    };

};

export const getLeaderboardService = async (query) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 25;

    const skip = (page - 1) * limit;

    const search = query.search || "";

    const sortField = query.sort || "stats.wins";

    const order = query.order === "asc" ? 1 : -1;

    const filter = {

        role: "PLAYER"

    };

    if (search) {

        filter.$or = [

            {

                username: {

                    $regex: search,

                    $options: "i"

                }

            },

            {

                displayName: {

                    $regex: search,

                    $options: "i"

                }

            }

        ];

    }

    const players = await User.find(filter)

        .select(

            "username displayName avatar currentRank highestRank elo stats"

        )

        .sort({

            [sortField]: order

        })

        .skip(skip)

        .limit(limit);

    const total = await User.countDocuments(filter);

    const leaderboard = players.map((player, index) => ({

        rank: skip + index + 1,

        ...player.toObject(),

        winRate:

            player.stats.matchesPlayed === 0

                ? 0

                : Number(

                    (

                        player.stats.wins /

                        player.stats.matchesPlayed

                    ) * 100

                ).toFixed(1)

    }));

    return {

        players: leaderboard,

        page,

        limit,

        total,

        totalPages: Math.ceil(total / limit)

    };

};