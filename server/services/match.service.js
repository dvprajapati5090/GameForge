import Match from "../models/match.model.js";
import Tournament from "../models/tournament.model.js";
import ApiError from "../utils/ApiError.js";

import {

    updatePlayerMatchStats,

    updateChampionStats,

    updateTournamentPlayedStats,

    createTournamentHistory

} from "./statistics.service.js";

export const updateMatchWinnerService = async (

    matchId,
    winnerId,
    scoreA,
    scoreB,
    userId

) => {

    const match = await Match.findById(matchId);

    if (!match)
        throw new ApiError(404, "Match not found");

    const tournament = await Tournament.findById(match.tournament);

    if (!tournament)
        throw new ApiError(404, "Tournament not found");

    if (tournament.organizer.toString() !== userId.toString()) {

        throw new ApiError(
            403,
            "Only organizer can update match"
        );

    }

    if (match.status === "COMPLETED") {

        throw new ApiError(
            400,
            "Match already completed"
        );

    }

    if (
        winnerId !== match.teamA?.toString() &&
        winnerId !== match.teamB?.toString()
    ) {

        throw new ApiError(
            400,
            "Winner must be one of the teams"
        );

    }

    // Validate scores

    if (
        scoreA == null ||
        scoreB == null
    ) {

        throw new ApiError(
            400,
            "Scores are required."
        );

    }

    if (scoreA === scoreB) {

        throw new ApiError(
            400,
            "Scores cannot be equal."
        );

    }

    if (
        winnerId === match.teamA.toString() &&
        scoreA < scoreB
    ) {

        throw new ApiError(
            400,
            "Winner score must be higher."
        );

    }

    if (
        winnerId === match.teamB.toString() &&
        scoreB < scoreA
    ) {

        throw new ApiError(
            400,
            "Winner score must be higher."
        );

    }

    match.scoreA = scoreA;

    match.scoreB = scoreB;

    match.winner = winnerId;

    match.status = "COMPLETED";

    match.completedAt = new Date();

    await match.save();

    // -----------------------------------
    // Advance winner
    // -----------------------------------

    if (match.nextMatch) {

        const nextMatch =
            await Match.findById(match.nextMatch);

        nextMatch[match.nextMatchSlot] = winnerId;

        if (

            nextMatch.teamA &&
            nextMatch.teamB &&
            nextMatch.status === "PENDING"

        ) {

            nextMatch.status = "READY";

        }

        await nextMatch.save();

    }

    // -----------------------------------
    // Update player statistics
    // -----------------------------------

    const loserId =

        winnerId === match.teamA.toString()

            ? match.teamB.toString()

            : match.teamA.toString();

    await updatePlayerMatchStats(

        winnerId,

        loserId

    );

    // -----------------------------------
    // Check tournament completion
    // -----------------------------------

    const remainingMatches = await Match.countDocuments({

        tournament: tournament._id,

        status: {

            $ne: "COMPLETED"

        }

    });

    if (remainingMatches === 0) {

        tournament.status = "COMPLETED";

        tournament.winner = winnerId;

        await tournament.save();

        await updateChampionStats(winnerId);

        await updateTournamentPlayedStats(
            tournament.registeredTeams
        );

        await createTournamentHistory(
            tournament,
            winnerId
        );

    }

    return await Match.findById(match._id)

        .populate("teamA", "name logo")

        .populate("teamB", "name logo")

        .populate("winner", "name logo");

};