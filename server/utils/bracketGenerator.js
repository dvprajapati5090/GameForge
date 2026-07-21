import mongoose from "mongoose";

export function generateBracket(teams, tournamentId) {

    // Shuffle teams
    teams = [...teams];

    for (let i = teams.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [teams[i], teams[j]] = [teams[j], teams[i]];
    }

    // Next power of 2
    const bracketSize = Math.pow(
        2,
        Math.ceil(Math.log2(teams.length))
    );

    // Add BYEs
    while (teams.length < bracketSize) {

        teams.push(null);

    }

    const rounds = [];

    let currentTeams = teams;

    let round = 1;

    while (currentTeams.length > 1) {

        const matches = [];

        for (let i = 0; i < currentTeams.length; i += 2) {

            matches.push({

                _id: new mongoose.Types.ObjectId(),

                tournament: tournamentId,

                round,

                matchNumber: matches.length + 1,

                teamA: currentTeams[i],

                teamB: currentTeams[i + 1],

                winner: null,

                status:
                    currentTeams[i] && currentTeams[i + 1]
                        ? "READY"
                        : "PENDING",

                nextMatch: null,

                nextMatchSlot: null

            });

        }

        rounds.push(matches);

        currentTeams = new Array(matches.length);

        round++;

    }

    // Link matches
    for (let r = 0; r < rounds.length - 1; r++) {

        for (let i = 0; i < rounds[r].length; i++) {

            rounds[r][i].nextMatch =
                rounds[r + 1][Math.floor(i / 2)]._id;

            rounds[r][i].nextMatchSlot =
                i % 2 === 0
                    ? "teamA"
                    : "teamB";

        }

    }

    return rounds.flat();

}