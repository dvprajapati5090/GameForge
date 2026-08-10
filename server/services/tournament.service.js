import mongoose from "mongoose";
import Tournament from "../models/tournament.model.js";
import ApiError from "../utils/ApiError.js";

import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import Match from "../models/match.model.js";

import Notification from "../models/notification.model.js";

import updateTournamentStatus from "../utils/updateTournamentStatus.js";

import { createNotification } from "./notification.service.js";

import { generateBracket } from "../utils/bracketGenerator.js";

import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUpload.js";

import {
    emitTournamentUpdated,
    emitBracketUpdated
} from "../socket/socketManager.js";

import { getIO } from "../socket/socketManager.js";

import {
    createChallongeTournament,
    addParticipants,
    startChallongeTournament,
    getChallongeMatches,
    getChallongeParticipants
} from "./thirdParty/challonge.service.js";

const createSingleEliminationBracket = async (tournament, teams) => {
    const bracketSize = 2 ** Math.ceil(Math.log2(teams.length));
    const roundCount = Math.log2(bracketSize);
    const rounds = [];

    for (let round = 1; round <= roundCount; round++) {
        const matches = await Match.insertMany(
            Array.from({ length: bracketSize / (2 ** round) }, (_, index) => ({
                tournament: tournament._id,
                round,
                matchNumber: index + 1
            }))
        );
        rounds.push(matches);
    }

    for (let round = 0; round < rounds.length - 1; round++) {
        for (let index = 0; index < rounds[round].length; index++) {
            const match = rounds[round][index];
            match.nextMatch = rounds[round + 1][Math.floor(index / 2)]._id;
            match.nextMatchSlot = index % 2 === 0 ? "teamA" : "teamB";
            await match.save();
        }
    }

    for (let index = 0; index < rounds[0].length; index++) {
        const match = rounds[0][index];
        match.teamA = teams[index * 2] || null;
        match.teamB = teams[index * 2 + 1] || null;
        match.status = match.teamA && match.teamB ? "LIVE" : "PENDING";
        await match.save();
    }

    tournament.bracketGenerated = true;
    await tournament.save();
    return rounds.flat();
};

export const createTournamentService = async (
    tournamentData,
    organizerId,
    file
) => {

    const {

        name,
        game,
        mode,
        format,
        description = "",
        banner = "",
        maxTeams,
        registrationStart,
        registrationEnd,
        tournamentStart,
        isPaid = false,
        entryFee = 0,
        prizePool = 0,
        currency = "INR",
        rules = ""

    } = tournamentData;

    const existingTournament =
        await Tournament.findOne({ name });

    if (existingTournament) {
        throw new ApiError(
            409,
            "Tournament name already exists"
        );
    }

    const registrationStartDate =
        new Date(registrationStart);

    const registrationEndDate =
        new Date(registrationEnd);

    const tournamentStartDate =
        new Date(tournamentStart);

    if (
        registrationEndDate <= registrationStartDate
    ) {
        throw new ApiError(
            400,
            "Registration end must be after registration start"
        );
    }

    if (
        tournamentStartDate <= registrationEndDate
    ) {
        throw new ApiError(
            400,
            "Tournament must start after registrations end"
        );
    }

    if (file) {

        const uploaded = await uploadToCloudinary(

            file.buffer,

            {
                folder: "gameforge/tournaments",

                transformation: [

                    {
                        width: 1200,
                        height: 500,
                        crop: "fill"
                    }

                ]

            }

        );

        console.log(
            "TOURNAMENT BANNER:",
            uploaded
        );

        tournamentData.banner = uploaded.url;

        tournamentData.bannerPublicId = uploaded.publicId;

    }

    const tournament =
        await Tournament.create({

            name,
            game,
            mode,
            format,
            description,
            banner: tournamentData.banner || "",
            bannerPublicId: tournamentData.bannerPublicId || "",
            organizer: organizerId,
            maxTeams,
            registrationStart: registrationStartDate,
            registrationEnd: registrationEndDate,
            tournamentStart: tournamentStartDate,
            isPaid,
            entryFee,
            prizePool,
            currency,
            rules,
            status: "DRAFT"

        });

    emitTournamentUpdated();

    return tournament;

};

export const getTournamentByIdService = async (tournamentId) => {

    const tournament = await Tournament.findById(tournamentId)
        .populate("organizer", "username displayName avatar")
        .populate("winner", "name logo")
        .populate({
            path: "registeredTeams",
            populate: {
                path: "captain",
                select: "username displayName avatar"
            }
        });

    if (!tournament) {
        throw new ApiError(
            404,
            "Tournament not found"
        );
    }

    // ⭐ Automatically update status
    await updateTournamentStatus(tournament);

    return tournament;
};

export const getAllTournamentsService = async (query) => {

    let {
        page = 1,
        limit = 10,
        search,
        game,
        status,
        sort = "newest"
    } = query;

    page = Number(page);
    limit = Number(limit);

    const filter = {
        isPublic: true
    };

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };
    }

    if (game) {
        filter.game = game;
    }

    if (status) {
        filter.status = status;
    }

    const sortOption =
        sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };

    const total =
        await Tournament.countDocuments(filter);

    const tournaments =
        await Tournament.find(filter)
            .populate(
                "organizer",
                "username displayName avatar"
            )
            .select("-registeredTeams")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);

    for (const tournament of tournaments) {
        await updateTournamentStatus(tournament);
    }        

    return {

        tournaments,

        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }

    };

};

export const updateTournamentService = async (
    tournamentId,
    updateData,
    userId,
    file
) => {

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
        throw new ApiError(
            404,
            "Tournament not found"
        );
    }

    if (tournament.organizer.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "Only the organizer can update this tournament"
        );
    }

    if (
        ["LIVE", "COMPLETED", "CANCELLED"]
            .includes(tournament.status)
    ) {
        throw new ApiError(
            400,
            `Tournament cannot be updated once it is ${tournament.status}`
        );
    }

    // Validate dates if supplied
    const registrationStart =
        updateData.registrationStart
            ? new Date(updateData.registrationStart)
            : tournament.registrationStart;

    const registrationEnd =
        updateData.registrationEnd
            ? new Date(updateData.registrationEnd)
            : tournament.registrationEnd;

    const tournamentStart =
        updateData.tournamentStart
            ? new Date(updateData.tournamentStart)
            : tournament.tournamentStart;

    if (registrationEnd <= registrationStart) {
        throw new ApiError(
            400,
            "Registration end must be after registration start"
        );
    }

    if (tournamentStart <= registrationEnd) {
        throw new ApiError(
            400,
            "Tournament must start after registration ends"
        );
    }

    // Don't allow changing maxTeams after registration has started
    if (
        updateData.maxTeams !== undefined &&
        updateData.maxTeams !== tournament.maxTeams &&
        new Date() >= tournament.registrationStart
    ) {
        throw new ApiError(
            400,
            "Cannot change max teams after registration has started"
        );
    }

    const oldBannerPublicId =
        tournament.bannerPublicId;


    if (file) {

        const uploaded = await uploadToCloudinary(

            file.buffer,

            {
                folder: "gameforge/tournaments",

                transformation: [

                    {
                        width:1200,
                        height:500,
                        crop:"fill"
                    }

                ]

            }

        );


        updateData.banner = uploaded.url;

        updateData.bannerPublicId =
            uploaded.publicId;

    }

    Object.assign(tournament, updateData);

    if (

        file &&

        oldBannerPublicId &&

        oldBannerPublicId !== tournament.bannerPublicId

    ) {

        try {

            await deleteFromCloudinary(
                oldBannerPublicId
            );

        }

        catch(error) {

            console.error(
                "Failed deleting old tournament banner",
                error
            );

        }

    }

    await tournament.save();

    return await Tournament.findById(tournament._id)
        .populate(
            "organizer",
            "username displayName avatar"
        )
        .populate(
            "winner",
            "name logo"
        );
};

export const deleteTournamentService = async (
    tournamentId,
    userId
) => {

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
        throw new ApiError(
            404,
            "Tournament not found"
        );
    }

    if (tournament.organizer.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "Only the organizer can delete this tournament"
        );
    }

    if (
        !["DRAFT", "REGISTRATION_OPEN"].includes(
            tournament.status
        )
    ) {
        throw new ApiError(
            400,
            "Tournament cannot be deleted"
        );
    }

    if (tournament.registrationCount > 0) {
        throw new ApiError(
            400,
            "Cannot delete a tournament with registered teams"
        );
    }

    await Match.deleteMany({ tournament: tournament._id });
    await tournament.deleteOne();

    return;
};

export const registerTeamService = async (
    tournamentId,
    userId
) => {

    const user = await User.findById(userId);

    if (!user.team) {
        throw new ApiError(
            400,
            "You are not part of any team"
        );
    }

    const team = await Team.findById(user.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    if (team.captain.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "Only the captain can register the team"
        );
    }

    const tournament =
        await Tournament.findById(tournamentId);

    if (!tournament) {
        throw new ApiError(
            404,
            "Tournament not found"
        );
    }

    await updateTournamentStatus(tournament);

    if (!tournament.isPublic) {
        throw new ApiError(
            403,
            "Tournament is private"
        );
    }

    if (tournament.status !== "REGISTRATION_OPEN") {
        throw new ApiError(
            400,
            "Tournament registrations are closed"
        );
    }

    const now = new Date();

    if (
        now < tournament.registrationStart ||
        now > tournament.registrationEnd
    ) {
        throw new ApiError(
            400,
            "Registration window is closed"
        );
    }

    if (
        tournament.registrationCount >=
        tournament.maxTeams
    ) {
        throw new ApiError(
            400,
            "Tournament is full"
        );
    }

    const alreadyRegistered =
        tournament.registeredTeams.some(
            teamId =>
                teamId.toString() === team._id.toString()
        );

    if (alreadyRegistered) {
        throw new ApiError(
            409,
            "Team already registered"
        );
    }

    const updatedTournament = await Tournament.findOneAndUpdate(
        {
            _id: tournament._id,
            status: "REGISTRATION_OPEN",
            registrationCount: { $lt: tournament.maxTeams },
            registeredTeams: { $ne: team._id }
        },
        {
            $addToSet: { registeredTeams: team._id },
            $inc: { registrationCount: 1 }
        },
        { new: true }
    );

    if (!updatedTournament) {
        throw new ApiError(409, "Tournament registration changed; please try again");
    }

    await createNotification(

        tournament.organizer,

        "New Tournament Registration",

        `${team.name} has registered for ${tournament.name}.`,

        "TOURNAMENT",

        `/host/tournaments/${tournament._id}`

    );

    emitTournamentUpdated();

    return await Tournament.findById(
        updatedTournament._id
    )
        .populate(
            "registeredTeams",
            "name logo"
        )
        .populate(
            "organizer",
            "username displayName"
        );

};

export const withdrawTeamService = async (
    tournamentId,
    userId
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    if (!user.team) {
        throw new ApiError(
            400,
            "You are not part of any team"
        );
    }

    const team = await Team.findById(user.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    if (team.captain.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "Only the team captain can withdraw the team"
        );
    }

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
        throw new ApiError(
            404,
            "Tournament not found"
        );
    }

    await updateTournamentStatus(tournament);

    if (
        ["LIVE", "COMPLETED"].includes(tournament.status)
    ) {
        throw new ApiError(
            400,
            `Cannot withdraw after tournament is ${tournament.status}`
        );
    }

    const registered =
        tournament.registeredTeams.some(
            teamId =>
                teamId.toString() ===
                team._id.toString()
        );

    if (!registered) {
        throw new ApiError(
            400,
            "Team is not registered in this tournament"
        );
    }

    tournament.registeredTeams =
        tournament.registeredTeams.filter(
            teamId =>
                teamId.toString() !==
                team._id.toString()
        );

    tournament.registrationCount--;

    await tournament.save();

    return await Tournament.findById(
        tournament._id
    )
        .populate(
            "organizer",
            "username displayName avatar"
        )
        .populate(
            "registeredTeams",
            "name logo"
        )
        .populate(
            "winner",
            "name logo"
        );

};

export const completeTournamentService = async (
    tournamentId,
    winnerTeamId,
    userId
) => {

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
        throw new ApiError(
            404,
            "Tournament not found"
        );
    }

    if (
        tournament.organizer.toString() !==
        userId.toString()
    ) {
        throw new ApiError(
            403,
            "Only the organizer can complete the tournament"
        );
    }

    await updateTournamentStatus(tournament);

    if (tournament.status === "COMPLETED") {
        throw new ApiError(
            400,
            "Tournament is already completed"
        );
    }

    if (tournament.status !== "LIVE") {
        throw new ApiError(
            400,
            "Tournament is not live"
        );
    }

    const winnerTeam = await Team.findById(
        winnerTeamId
    );

    if (!winnerTeam) {
        throw new ApiError(
            404,
            "Winner team not found"
        );
    }

    const registered =
        tournament.registeredTeams.some(
            teamId =>
                teamId.toString() ===
                winnerTeamId.toString()
        );

    if (!registered) {
        throw new ApiError(
            400,
            "Winner team is not registered"
        );
    }

    tournament.winner = winnerTeamId;
    tournament.status = "COMPLETED";

    await tournament.save();

    const players = await User.find({
        team: winnerTeamId
    });


    for (const player of players) {

        await createNotification(
            player._id,
            "Tournament Champion 🏆",
            `Your team won ${tournament.name}`,
            "ACHIEVEMENT",
            "/profile"
        );

    }

    return await Tournament.findById(
        tournament._id
    )
        .populate(
            "organizer",
            "username displayName avatar"
        )
        .populate(
            "registeredTeams",
            "name logo"
        )
        .populate(
            "winner",
            "name logo"
        );
};

export const generateBracketService = async (

    tournamentId,
    userId

) => {

    const tournament = await Tournament.findById(tournamentId)
        .populate("registeredTeams", "name logo");

    if (!tournament)
        throw new ApiError(404, "Tournament not found");

    if (tournament.organizer.toString() !== userId.toString())
        throw new ApiError(403, "Only organizer can generate bracket");

    await updateTournamentStatus(tournament);

    if (tournament.bracketGenerated)
        throw new ApiError(400, "Bracket already generated");

    if (tournament.registrationCount < 2)
        throw new ApiError(400, "Need at least 2 registered teams to generate a bracket");

    if (tournament.format !== "SINGLE_ELIMINATION") {
        throw new ApiError(400, "Only single-elimination brackets are supported");
    }

    // NOTE: We no longer require the tournament to be full.
    // Challonge handles byes automatically for any team count ≥ 2.

    // ------------------------------------------------------------------
    // PHASE 1 — Create & start tournament on Challonge
    //           Challonge generates the full bracket tree with byes.
    // ------------------------------------------------------------------

    const urlSlug = `gf-${tournament._id.toString().slice(-8)}-${Date.now()}`;

    const formatMap = {
        SINGLE_ELIMINATION: "single elimination",
        DOUBLE_ELIMINATION: "double elimination"
    };

    let challongeId = null;
    let challongeUrl = null;

    // name → local Team document (for later lookups)
    const teamByName = {};
    for (const team of tournament.registeredTeams) {
        teamByName[team.name] = team;
    }

    // challonge participant id → local Team _id
    const challongeIdToTeam = {};

    let challongeMatches = [];
    let challongeParticipants = [];

    try {

        // 1a. Create Challonge tournament
        const challongeTournament = await createChallongeTournament(
            tournament.name,
            urlSlug,
            formatMap[tournament.format] ?? "single elimination",
            tournament.game
        );

        challongeId = challongeTournament.challongeId;
        challongeUrl = challongeTournament.challongeUrl;

        console.log(`[Challonge] Created tournament: ${challongeId} → ${challongeUrl}`);

        // 1b. Add all registered teams as participants
        const added = await addParticipants(
            challongeId,
            tournament.registeredTeams.map(t => ({ name: t.name }))
        );

        for (const p of added) {
            const team = teamByName[p.name];
            if (team) challongeIdToTeam[p.id] = team;
        }

        // 1c. Start the tournament — Challonge randomises seeding & creates match tree
        await startChallongeTournament(challongeId);

        // 1d. Fetch the full match + participant lists Challonge generated
        [challongeMatches, challongeParticipants] = await Promise.all([
            getChallongeMatches(challongeId),
            getChallongeParticipants(challongeId)
        ]);

        // Fill in any gaps in the challongeIdToTeam map using the participant list
        for (const p of challongeParticipants) {
            if (!challongeIdToTeam[p.id]) {
                const team = teamByName[p.name];
                if (team) challongeIdToTeam[p.id] = team;
            }
        }

        // Persist Challonge reference
        tournament.challongeId = challongeId;
        tournament.challongeUrl = challongeUrl;

    } catch (err) {
        console.error("[Challonge] Integration error:", err.message);
        // Will fall back to local algorithm below
    }

    // ------------------------------------------------------------------
    // PHASE 2 — Build local Match documents
    //
    //   PRIMARY path: use Challonge's match list as the source of truth.
    //     • Challonge gives us round, player1_id, player2_id for every slot.
    //     • A null player_id = BYE (Challonge handles this for any team count).
    //     • We re-create the nextMatch tree by matching adjacent matches.
    //
    //   FALLBACK path: Challonge unavailable → local bracketGenerator.
    // ------------------------------------------------------------------

    let matches;

    if (challongeId && challongeMatches.length > 0) {

        // Sort Challonge matches by round then by id (gives stable order)
        challongeMatches.sort((a, b) =>
            a.round !== b.round ? a.round - b.round : a.challongeMatchId - b.challongeMatchId
        );

        // Build a map: challongeMatchId → local Match plain object
        const cIdToLocal = {};

        matches = challongeMatches.map((cm, idx) => {

            const teamA = challongeIdToTeam[cm.player1Id] ?? null;
            const teamB = challongeIdToTeam[cm.player2Id] ?? null;

            const localMatch = {
                _id: new mongoose.Types.ObjectId(),
                tournament: tournament._id,
                round: cm.round,
                matchNumber: idx + 1,  // will be corrected per-round below
                teamA: teamA ? teamA._id : null,
                teamB: teamB ? teamB._id : null,
                winner: null,
                status: teamA && teamB ? "READY" : "PENDING",
                nextMatch: null,
                nextMatchSlot: null,
                challongeMatchId: cm.challongeMatchId,
                challongePlayer1Id: cm.player1Id ?? null,
                challongePlayer2Id: cm.player2Id ?? null,
            };

            cIdToLocal[cm.challongeMatchId] = localMatch;
            return localMatch;
        });

        // Fix matchNumber to be 1-indexed within each round
        const byRound = {};
        for (const m of matches) {
            if (!byRound[m.round]) byRound[m.round] = [];
            byRound[m.round].push(m);
        }
        for (const roundMatches of Object.values(byRound)) {
            roundMatches.forEach((m, i) => { m.matchNumber = i + 1; });
        }

        // ------------------------------------------------------------------
        // Link nextMatch: For single-elimination, the winner of match[r][i]
        // goes to match[r+1][floor(i/2)] in slot teamA (even i) or teamB (odd i).
        // We rebuild the tree from the sorted-by-round-then-order local list.
        // ------------------------------------------------------------------
        const rounds = Object.keys(byRound).map(Number).sort((a, b) => a - b);
        for (let ri = 0; ri < rounds.length - 1; ri++) {
            const current = byRound[rounds[ri]];
            const next    = byRound[rounds[ri + 1]];
            for (let i = 0; i < current.length; i++) {
                const nextMatch = next[Math.floor(i / 2)];
                if (nextMatch) {
                    current[i].nextMatch    = nextMatch._id;
                    current[i].nextMatchSlot = i % 2 === 0 ? "teamA" : "teamB";
                }
            }
        }

        // Determine the lowest (first) round number
        const minRound = Math.min(...matches.map(m => m.round));

        // Auto-advance BYEs — multi-pass cascade
        // Ghost (null vs null) only applies to round 1 — higher rounds are
        // intentionally empty at generation time and fill as games complete.
        let changed = true;
        while (changed) {
            changed = false;
            for (const match of matches) {

                // Ghost match: both null AND in round 1 → mark completed (no winner)
                if (!match.teamA && !match.teamB && match.round === minRound && match.status !== "COMPLETED") {
                    match.status = "COMPLETED";
                    changed = true;
                    continue;
                }

                // BYE match: exactly one real team → advance it
                const byeTeam = (match.teamA && !match.teamB) ? match.teamA
                              : (!match.teamA && match.teamB) ? match.teamB
                              : null;

                if (byeTeam && match.nextMatch && match.status !== "COMPLETED") {
                    match.status = "COMPLETED";
                    match.winner = byeTeam;

                    const next = matches.find(m => m._id.toString() === match.nextMatch.toString());
                    if (next) {
                        next[match.nextMatchSlot] = byeTeam;
                        if (next.teamA && next.teamB && next.status === "PENDING") {
                            next.status = "READY";
                        }
                    }
                    changed = true;
                }
            }
        }

    } else {

        // ------------------------------------------------------------------
        // FALLBACK — Local bracket generator (no Challonge connection)
        // ------------------------------------------------------------------
        console.warn("[Challonge] Using local bracket generator as fallback.");

        const teamIds = [...tournament.registeredTeams.map(t => t._id)];
        // Shuffle
        for (let i = teamIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [teamIds[i], teamIds[j]] = [teamIds[j], teamIds[i]];
        }
        matches = generateBracket(teamIds, tournament._id);

        const minRoundFb = Math.min(...matches.map(m => m.round));

        // Auto-advance BYEs — multi-pass cascade (fallback path)
        // Ghost detection restricted to round 1 only.
        let changedFb = true;
        while (changedFb) {
            changedFb = false;
            for (const match of matches) {
                if (!match.teamA && !match.teamB && match.round === minRoundFb && match.status !== "COMPLETED") {
                    match.status = "COMPLETED";
                    changedFb = true;
                    continue;
                }

                const byeTeam = (match.teamA && !match.teamB) ? match.teamA
                              : (!match.teamA && match.teamB) ? match.teamB
                              : null;

                if (byeTeam && match.nextMatch && match.status !== "COMPLETED") {
                    match.status = "COMPLETED";
                    match.winner = byeTeam;

                    const next = matches.find(m => m._id.toString() === match.nextMatch?.toString());
                    if (next) {
                        next[match.nextMatchSlot] = byeTeam;
                        if (next.teamA && next.teamB && next.status === "PENDING") {
                            next.status = "READY";
                        }
                    }
                    changedFb = true;
                }
            }
        }
    }

    // ------------------------------------------------------------------
    // PHASE 3 — Persist to MongoDB & notify
    // ------------------------------------------------------------------

    await Match.deleteMany({ tournament: tournament._id });
    await Match.insertMany(matches);

    tournament.bracketGenerated = true;
    tournament.status = "LIVE";
    await tournament.save();

    emitBracketUpdated(tournament._id);
    emitTournamentUpdated();

    for (const team of tournament.registeredTeams) {
        const members = await User.find({ team: team._id });
        for (const member of members) {
            await createNotification(
                member._id,
                "Bracket Generated",
                `${tournament.name} bracket is ready!`,
                "TOURNAMENT",
                `/tournaments/${tournament._id}/bracket`
            );
        }
    }

    emitTournamentUpdated();

    return await Match.find({ tournament: tournament._id })
        .populate("teamA", "name logo")
        .populate("teamB", "name logo")
        .populate("winner", "name logo")
        .sort({ round: 1, matchNumber: 1 });

};

export const getBracketService = async (tournamentId) => {

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }

    // ------------------------------------------------------------------
    // Fetch live data from Challonge (if linked) and sync to local DB
    // ------------------------------------------------------------------

    if (tournament.challongeId) {
        try {

            const [challongeMatches, challongeParticipants] = await Promise.all([
                getChallongeMatches(tournament.challongeId),
                getChallongeParticipants(tournament.challongeId)
            ]);

            // Sync completed matches back to local DB
            const localMatches = await Match.find({ tournament: tournamentId });

            for (const cm of challongeMatches) {

                if (cm.state !== "complete" || !cm.winnerId) continue;

                const localMatch = localMatches.find(
                    m => m.challongeMatchId === cm.challongeMatchId
                );

                if (!localMatch || localMatch.status === "COMPLETED") continue;

                // Find which team corresponds to the Challonge winner
                const winnerParticipant = challongeParticipants.find(
                    p => p.id === cm.winnerId
                );

                if (!winnerParticipant) continue;

                // Look up the local team by name
                const winnerTeam = await Team.findOne({ name: winnerParticipant.name });

                if (!winnerTeam) continue;

                // Parse scores
                const parts = (cm.scoresCsv ?? "0-0").split("-");
                localMatch.scoreA = Number(parts[0]) || 0;
                localMatch.scoreB = Number(parts[1]) || 0;
                localMatch.winner = winnerTeam._id;
                localMatch.status = "COMPLETED";
                localMatch.completedAt = new Date();
                await localMatch.save();

                // Advance winner to next match
                if (localMatch.nextMatch) {
                    const nextMatch = await Match.findById(localMatch.nextMatch);
                    if (nextMatch && nextMatch.status !== "COMPLETED") {
                        nextMatch[localMatch.nextMatchSlot] = winnerTeam._id;
                        if (nextMatch.teamA && nextMatch.teamB && nextMatch.status === "PENDING") {
                            nextMatch.status = "READY";
                        }
                        await nextMatch.save();
                    }
                }

            }

        } catch (err) {
            // Non-fatal: fall back to local DB state
            console.error("[Challonge] Failed to sync bracket:", err.message);
        }
    }

    // ------------------------------------------------------------------
    // Return bracket from local DB (now synced with Challonge)
    // ------------------------------------------------------------------

    const matches = await Match.find({ tournament: tournamentId })
        .populate("teamA", "name logo")
        .populate("teamB", "name logo")
        .populate("winner", "name logo")
        .sort({ round: 1, matchNumber: 1 });

    const grouped = {};
    for (const match of matches) {
        if (!grouped[match.round]) grouped[match.round] = [];
        grouped[match.round].push(match);
    }

    const rounds = Object.keys(grouped).map(round => {

        const totalRounds = Object.keys(grouped).length;
        let title = `Round ${round}`;

        if (totalRounds === 1)          title = "Final";
        else if (round == totalRounds)  title = "Grand Final";
        else if (round == totalRounds - 1) title = "Semi Finals";
        else if (round == totalRounds - 2) title = "Quarter Finals";

        return {
            round: Number(round),
            title,
            matches: grouped[round]
        };

    });

    return {
        tournament: {
            id: tournament._id,
            status: tournament.status,
            champion: tournament.winner,
            challongeUrl: tournament.challongeUrl ?? null
        },
        rounds
    };

};

export const getMyTournamentsService = async (userId) => {

    return await Tournament.find({

        organizer: userId

    })

    .populate(

        "organizer",

        "username displayName avatar"

    )

    .populate(

        "winner",

        "name logo"

    )

    .sort({

        createdAt: -1

    });

};

export const checkTournamentEligibilityService = async (

    tournamentId,
    userId

) => {

    const tournament = await Tournament
        .findById(tournamentId);

    if (!tournament) {

        throw new ApiError(
            404,
            "Tournament not found"
        );

    }

    const user = await User
        .findById(userId)
        .populate({
            path: "team",
            populate: {
                path: "members"
            }
        });

    const team = user.team;

    const hasEnoughSlots =
        tournament.registrationCount <
        tournament.maxTeams;

    const requiredPlayers = {

        SOLO: 1,

        DUO: 2,

        SQUAD: 4,

        "5V5": 5

    }[tournament.mode];

    const checks = {

        hasTeam: !!team,

        isCaptain: team
            ? team.captain.toString() === userId.toString()
            : false,

        teamSize:
            team
                ? (
                    team.members.length === requiredPlayers &&
                    team.maxMembers >= requiredPlayers
                )
                : false,

        alreadyRegistered: team
            ? tournament.registeredTeams.some(

                t => t.toString() === team._id.toString()

            )
            : false,

        registrationOpen:

            new Date() >= tournament.registrationStart &&

            new Date() <= tournament.registrationEnd,

        tournamentFull:
            !hasEnoughSlots,

        sameGame: true

    };

    const eligible =

        checks.hasTeam &&

        checks.isCaptain &&

        checks.teamSize &&

        !checks.alreadyRegistered &&

        checks.registrationOpen &&

        !checks.tournamentFull &&

        checks.sameGame;

    return {

        eligible,

        checks: {

            ...checks,

            requiredPlayers
        }

    };

};