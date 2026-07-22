import Team from "../models/team.model.js";
import User from "../models/user.model.js";

import TournamentHistory from "../models/tournamentHistory.model.js";

export const updatePlayerMatchStats = async (
    winnerTeamId,
    loserTeamId
) => {

    const teams = await Team.find({

        _id: {

            $in: [

                winnerTeamId,

                loserTeamId

            ]

        }

    }).select("captain members");

    const winnerTeam = teams.find(

        t => t._id.toString() === winnerTeamId.toString()

    );

    const loserTeam = teams.find(

        t => t._id.toString() === loserTeamId.toString()

    );

    console.log("Winner Team:", winnerTeam);
    console.log("Loser Team:", loserTeam);

    if (!winnerTeam || !loserTeam) {

        console.log("Teams not found!");

        return;

    }

    const winnerPlayers = [

        ...new Set(
            [
                winnerTeam.captain.toString(),
                ...winnerTeam.members.map(id => id.toString())
            ]
        )

    ];

    const loserPlayers = [

        ...new Set(
            [
                loserTeam.captain.toString(),
                ...loserTeam.members.map(id => id.toString())
            ]
        )

    ];

    const operations = [];

    for (const player of winnerPlayers) {

        operations.push({

            updateOne: {

                filter: {

                    _id: player

                },

                update: {

                    $inc: {

                        "stats.matchesPlayed": 1,

                        "stats.wins": 1

                    }

                }

            }

        });

    }

    for (const player of loserPlayers) {

        operations.push({

            updateOne: {

                filter: {

                    _id: player

                },

                update: {

                    $inc: {

                        "stats.matchesPlayed": 1,

                        "stats.losses": 1

                    }

                }

            }

        });

    }

    await User.bulkWrite(operations);

    console.log("Player stats updated successfully.");

};

export const updateChampionStats = async (winnerTeamId) => {

    const team = await Team.findById(winnerTeamId);

    if (!team) return;

    const players = [

        team.captain,

        ...team.members

    ];

    await User.updateMany(

        {
            _id: {
                $in: players
            }
        },

        {
            $inc: {
                "stats.championships": 1
            }
        }

    );

};

export const updateTournamentPlayedStats = async (teamIds) => {

    for (const teamId of teamIds) {

        const team = await Team.findById(teamId);

        if (!team) continue;

        const players = [

            team.captain,

            ...team.members

        ];

        await User.updateMany(

            {
                _id: {
                    $in: players
                }
            },

            {
                $inc: {
                    "stats.tournamentsPlayed": 1
                }
            }

        );

    }

};

export const createTournamentHistory = async (
    tournament,
    winnerTeamId
) => {

    // Fetch all teams in a single query
    const teams = await Team.find(

        {
            _id: {
                $in: tournament.registeredTeams
            }
        },

        "captain members"

    );

    const historyDocs = [];

    for (const team of teams) {

        const placement =

            team._id.toString() === winnerTeamId.toString()

                ? "CHAMPION"

                : "PARTICIPANT";

        const players = [

            team.captain,

            ...team.members

        ];

        for (const player of players) {

            historyDocs.push({

                user: player,

                tournament: tournament._id,

                team: team._id,

                placement

            });

        }

    }

    if (historyDocs.length > 0) {

        await TournamentHistory.insertMany(historyDocs);

    }

};