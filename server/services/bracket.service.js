import Match from "../models/match.model.js";
import Tournament from "../models/tournament.model.js";
import ApiError from "../utils/ApiError.js";

export const generateBracketService = async (

    tournamentId,
    userId

) => {

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament)
        throw new ApiError(404, "Tournament not found");

    if (tournament.organizer.toString() !== userId.toString())
        throw new ApiError(403, "Not authorized");

    if (tournament.bracketGenerated)
        throw new ApiError(400, "Bracket already generated");

    if (
        tournament.registeredTeams.length !==
        tournament.maxTeams
    ) {

        throw new ApiError(
            400,
            "Tournament must be full before generating bracket"
        );

    }

    const teams = [...tournament.registeredTeams];

    const rounds = Array.from(
        { length: Math.log2(tournament.maxTeams) },
        (_, index) => tournament.maxTeams / (2 ** (index + 1))
    );

    // Shuffle

    teams.sort(() => Math.random() - 0.5);

    const createdRounds = [];

    for (

        let r = 0;

        r < rounds.length;

        r++

    ) {

        const currentRound = [];

        for (

            let i = 0;

            i < rounds[r];

            i++

        ) {

            const match =
                await Match.create({

                    tournament: tournament._id,

                    round: r + 1,

                    matchNumber: i + 1

                });

            currentRound.push(match);

        }

        createdRounds.push(currentRound);

    }

    for (

        let i = 0;

        i < createdRounds[0].length;

        i++

    ) {

        createdRounds[0][i].teamA =
            teams[i * 2];

        createdRounds[0][i].teamB =
            teams[i * 2 + 1];

        await createdRounds[0][i].save();

    }

    for (

        let round = 0;

        round < createdRounds.length - 1;

        round++

    ) {

        const current =
            createdRounds[round];

        const next =
            createdRounds[round + 1];

        for (

            let i = 0;

            i < current.length;

            i++

        ) {

            const nextMatch =
                next[Math.floor(i / 2)];

            current[i].nextMatch =
                nextMatch._id;

            current[i].nextMatchSlot =
                i % 2 === 0
                    ? "teamA"
                    : "teamB";

            await current[i].save();

        }

    }

    tournament.bracketGenerated = true;

    await tournament.save();

    return tournament;

};
