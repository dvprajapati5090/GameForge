import Match from "../models/match.model.js";
import Tournament from "../models/tournament.model.js";
import ApiError from "../utils/ApiError.js";

import User from "../models/user.model.js";

import {

    updatePlayerMatchStats,

    updateChampionStats,

    updateTournamentPlayedStats,

    createTournamentHistory

} from "./statistics.service.js";

import { createNotification } from "./notification.service.js";

import {
    emitTournamentUpdated,
    emitBracketUpdated
} from "../socket/socketManager.js";

import { reportChallongeMatchResult } from "./thirdParty/challonge.service.js";

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

    // Note: hosts CAN update completed matches to correct results (e.g. auto-completed ghost matches)

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

    const winnerPlayers = await User.find({
        team: winnerId
    });

    for (const player of winnerPlayers) {

        await createNotification(

            player._id,

            "Victory!",

            "Your team won the match.",

            "ACHIEVEMENT",

            `/matches/${match._id}`

        );

    }

    const loserId =

        match.teamA.toString() === winnerId.toString()

            ? match.teamB

            : match.teamA;

    const loserPlayers = await User.find({
        team: loserId
    });

    for (const player of loserPlayers) {

        await createNotification(

            player._id,

            "Match Lost",

            "Better luck in the next tournament.",

            "MATCH_READY",

            `/matches/${match._id}`

        );

    }

    match.status = "COMPLETED";

    match.completedAt = new Date();

    await match.save();

    // -----------------------------------
    // Sync result to Challonge
    // -----------------------------------

    if (tournament.challongeId && match.challongeMatchId) {

        const isTeamAWinner = winnerId === match.teamA.toString();

        // Determine the Challonge participant ID of the winner
        const challongeWinnerId = isTeamAWinner
            ? match.challongePlayer1Id
            : match.challongePlayer2Id;

        if (challongeWinnerId) {

            try {

                await reportChallongeMatchResult(
                    tournament.challongeId,
                    match.challongeMatchId,
                    challongeWinnerId,
                    scoreA,
                    scoreB
                );

            } catch (err) {

                // Non-fatal: log the error and continue
                console.error("[Challonge] Failed to sync match result:", err.message);

            }

        }

    }

    // -----------------------------------
    // Advance winner
    // -----------------------------------

    let nextMatch = null;

    if (match.nextMatch) {

        nextMatch = await Match.findById(match.nextMatch);

        nextMatch[match.nextMatchSlot] = winnerId;

        if (
            nextMatch.teamA &&
            nextMatch.teamB &&
            nextMatch.status === "PENDING"
        ) {
            nextMatch.status = "READY";
        }

        await nextMatch.save();

        emitBracketUpdated(match.tournament);
        emitTournamentUpdated();

        // ------------------------------------------------------------------
        // SMART BYE CASCADE
        // After placing the winner, check if the OTHER slot in nextMatch is
        // still null. If yes, find the match that feeds that slot. If that
        // feeder is already COMPLETED with no winner (ghost match), the null
        // slot will NEVER be filled → auto-advance the winner through.
        // This ONLY fires for confirmed ghost slots, not "not played yet" slots.
        // ------------------------------------------------------------------

        let current = nextMatch;

        while (current && current.nextMatch) {

            const teamASet = !!current.teamA;
            const teamBSet = !!current.teamB;

            // Both real teams → real match, nothing to cascade
            if (teamASet && teamBSet) break;

            // Both null → can't determine winner, stop
            if (!teamASet && !teamBSet) break;

            // One slot filled — check if the empty slot's feeder is a dead ghost match
            const nullSlot    = teamASet ? "teamB" : "teamA";
            const filledTeam  = current.teamA || current.teamB;

            // Find the match that feeds into current[nullSlot]
            const feeder = await Match.findOne({
                tournament: match.tournament,
                nextMatch:  current._id,
                nextMatchSlot: nullSlot,
            });

            // Only cascade if: no feeder exists, OR feeder is COMPLETED with no winner (ghost)
            const isDeadSlot = !feeder || (feeder.status === "COMPLETED" && !feeder.winner);
            if (!isDeadSlot) break;

            // Auto-advance: mark current as a BYE walkover
            current.status      = "COMPLETED";
            current.winner      = filledTeam;
            current.scoreA      = 0;
            current.scoreB      = 0;
            current.completedAt = new Date();
            await current.save();

            // Advance into the match after current
            const afterBye = await Match.findById(current.nextMatch);

            // Stop if no match exists, OR if it's already properly completed (has a real winner)
            if (!afterBye || (afterBye.status === "COMPLETED" && afterBye.winner)) break;

            afterBye[current.nextMatchSlot] = filledTeam;

            if (afterBye.teamA && afterBye.teamB && afterBye.status === "PENDING") {
                afterBye.status = "READY";
            }

            await afterBye.save();

            emitBracketUpdated(match.tournament);
            emitTournamentUpdated();

            current = afterBye;
        }
    }


    if (
        nextMatch &&
        nextMatch.teamA &&
        nextMatch.teamB
    ) {

        const teams = [
            nextMatch.teamA,
            nextMatch.teamB
        ];

        for (const teamId of teams) {

            const players = await User.find({
                team: teamId
            });

            for (const player of players) {

                await createNotification(
                    player._id,
                    "Match Ready",
                    "Your next tournament match is ready.",
                    "MATCH_READY",
                    `/matches/${nextMatch._id}`
                );

            }

        }

        emitBracketUpdated(match.tournament);

        emitTournamentUpdated();

    }

    // -----------------------------------
    // Update player statistics
    // -----------------------------------

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

        // Push real-time update so the client refetches tournament + shows ChampionCard
        emitBracketUpdated(match.tournament);
        emitTournamentUpdated();

        await updateChampionStats(winnerId);

        await updateTournamentPlayedStats(
            tournament.registeredTeams
        );

        await createTournamentHistory(
            tournament,
            winnerId
        );

        const champions = await User.find({

            team: winnerId

        });

        for (const player of champions) {

            await createNotification(

                player._id,

                "🏆 Tournament Champion",

                `Congratulations! You won ${tournament.name}.`,

                "ACHIEVEMENT",

                `/tournaments/${tournament._id}`

            );

        }

        for (const teamId of tournament.registeredTeams) {

            const players = await User.find({
                team: teamId
            });

            for (const player of players) {

                await createNotification(
                    player._id,
                    "Tournament Completed",
                    `${tournament.name} has ended.`,
                    "TOURNAMENT",
                    `/tournaments/${tournament._id}`
                );

            }

        }

    }

    return await Match.findById(match._id)

        .populate("teamA", "name logo")

        .populate("teamB", "name logo")

        .populate("winner", "name logo");

};