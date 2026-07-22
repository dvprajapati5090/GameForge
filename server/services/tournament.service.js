import Tournament from "../models/tournament.model.js";
import ApiError from "../utils/ApiError.js";

import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import Match from "../models/match.model.js";

import Notification from "../models/notification.model.js";

import updateTournamentStatus from "../utils/updateTournamentStatus.js";

import { createNotification } from "./notification.service.js";

import { generateBracket } from "../utils/bracketGenerator.js";

import {
    emitTournamentUpdated,
    emitBracketUpdated
} from "../socket/socketManager.js";

import { getIO } from "../socket/socketManager.js";

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
    organizerId
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
        prizePool = 0,
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

    const tournament =
        await Tournament.create({

            name,
            game,
            mode,
            format,
            description,
            banner,
            organizer: organizerId,
            maxTeams,
            registrationStart: registrationStartDate,
            registrationEnd: registrationEndDate,
            tournamentStart: tournamentStartDate,
            prizePool,
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

    Object.assign(tournament, updateData);

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

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament)

        throw new ApiError(404, "Tournament not found");

    if (tournament.organizer.toString() !== userId.toString())

        throw new ApiError(
            403,
            "Only organizer can generate bracket"
        );

    await updateTournamentStatus(tournament);

    if (tournament.bracketGenerated)

        throw new ApiError(
            400,
            "Bracket already generated"
        );

    if (

        tournament.registrationCount < 2

    )

        throw new ApiError(
            400,
            "Not enough teams"
        );

    if (tournament.format !== "SINGLE_ELIMINATION") {
        throw new ApiError(
            400,
            "Only single-elimination brackets are supported"
        );
    }

    if (tournament.registrationCount !== tournament.maxTeams) {
        throw new ApiError(
            400,
            "Tournament must be full before generating its bracket"
        );
    }

    const teams = [...tournament.registeredTeams];

        for (

        let i = teams.length - 1;

        i > 0;

        i--

    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [teams[i], teams[j]] =
            [teams[j], teams[i]];

    }

    const matches = generateBracket(

        teams,

        tournament._id

    );

    await Match.insertMany(matches);

    // ----------------------------
    // Auto advance BYEs
    // ----------------------------

    for (const match of matches) {

        if (match.teamA && !match.teamB) {

            const next = matches.find(

                m =>

                    m._id.toString() ===

                    match.nextMatch?.toString()

            );

            if (next) {

                next[match.nextMatchSlot] = match.teamA;

                if (next.teamA && next.teamB) {

                    next.status = "READY";

                }

            }

        }

        if (!match.teamA && match.teamB) {

            const next = matches.find(

                m =>

                    m._id.toString() ===

                    match.nextMatch?.toString()

            );

            if (next) {

                next[match.nextMatchSlot] = match.teamB;

                if (next.teamA && next.teamB) {

                    next.status = "READY";

                }

            }

        }

    }

    await Match.deleteMany({

        tournament: tournament._id

    });

    await Match.insertMany(matches);

    tournament.bracketGenerated = true;

    tournament.status = "LIVE";

    await tournament.save();

    emitBracketUpdated(tournament._id);
    emitTournamentUpdated();

    for (const team of tournament.registeredTeams) {

        const members = await User.find({
            team: team
        });

        for (const member of members) {

            await createNotification(
                member._id,
                "Bracket Generated",
                `${tournament.name} bracket is ready.`,
                "TOURNAMENT",
                `/tournaments/${tournament._id}/bracket`
            );

        }

    }

    emitTournamentUpdated();

    return await Match.find({

        tournament: tournament._id

    })

    .populate("teamA","name logo")

    .populate("teamB","name logo")

    .populate("winner","name logo")

    .sort({

        round:1,

        matchNumber:1

    });

};

export const getBracketService = async (tournamentId) => {

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {

        throw new ApiError(
            404,
            "Tournament not found"
        );

    }

    const matches = await Match.find({

        tournament: tournamentId

    })
    .populate("teamA", "name logo")
    .populate("teamB", "name logo")
    .populate("winner", "name logo")
    .sort({

        round: 1,

        matchNumber: 1

    });

    const grouped = {};

    for (const match of matches) {

        if (!grouped[match.round]) {

            grouped[match.round] = [];

        }

        grouped[match.round].push(match);

    }

    const rounds = Object.keys(grouped).map(round => {

        const totalRounds = Object.keys(grouped).length;

        let title = `Round ${round}`;

        if (totalRounds === 1)

            title = "Final";

        else if (round == totalRounds)

            title = "Grand Final";

        else if (round == totalRounds - 1)

            title = "Semi Finals";

        else if (round == totalRounds - 2)

            title = "Quarter Finals";

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

            champion: tournament.winner

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