import Tournament from "../models/tournament.model.js";
import ApiError from "../utils/ApiError.js";

import Team from "../models/team.model.js";
import User from "../models/user.model.js";

import updateTournamentStatus from "../utils/updateTournamentStatus.js";

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

    return tournament;

};

export const getTournamentByIdService = async (tournamentId) => {

    const tournament = await Tournament.findById(tournamentId)
        .populate("organizer", "username displayName avatar")
        .populate("winner", "name logo");

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
        updateData.maxTeams &&
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

    tournament.registeredTeams.push(team._id);
    tournament.registrationCount++;

    await tournament.save();

    return await Tournament.findById(
        tournament._id
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