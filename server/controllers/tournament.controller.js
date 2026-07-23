import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    createTournamentService,
    getTournamentByIdService,
    getAllTournamentsService,
    updateTournamentService,
    deleteTournamentService,
    registerTeamService,
    withdrawTeamService,
    completeTournamentService,
    getBracketService,
    generateBracketService,
    getMyTournamentsService,
    checkTournamentEligibilityService
} from "../services/tournament.service.js";

export const createTournament = asyncHandler(
    async (req, res) => {

        console.log("REQ FILE:", req.file);

        const tournament =
            await createTournamentService(
                req.body,
                req.user._id,
                req.file
            );


        return res.json(
            new ApiResponse(
                201,
                tournament,
                "Tournament created successfully"
            )
        );

    }
);

export const getTournamentById = asyncHandler(async (req, res) => {

    const tournament = await getTournamentByIdService(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            "Tournament fetched successfully",
            tournament
        )
    );

});

export const getAllTournaments = asyncHandler(async (req, res) => {

    const data =
        await getAllTournamentsService(req.query);

    return res.status(200).json(
        new ApiResponse(
            "Tournaments fetched successfully",
            data
        )
    );

});

export const updateTournament = asyncHandler(async (req, res) => {

    const tournament =
        await updateTournamentService(
            req.params.id,
            req.body,
            req.user._id,
            req.file
        );

    return res.status(200).json(
        new ApiResponse(
            "Tournament updated successfully",
            tournament
        )
    );

});

export const deleteTournament = asyncHandler(async (req, res) => {

    await deleteTournamentService(
        req.params.id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            "Tournament deleted successfully",
            null
        )
    );

});

export const registerTeam = asyncHandler(async (req, res) => {

    const tournament =
        await registerTeamService(
            req.params.id,
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            "Team registered successfully",
            tournament
        )
    );

});

export const withdrawTeam = asyncHandler(async (req, res) => {

    const tournament =
        await withdrawTeamService(
            req.params.id,
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            "Team withdrawn successfully",
            tournament
        )
    );

});

export const completeTournament = asyncHandler(async (req, res) => {

    const tournament =
        await completeTournamentService(
            req.params.id,
            req.body.winnerTeamId,
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            "Tournament completed successfully",
            tournament
        )
    );

});

export const generateBracket = asyncHandler(async (

    req,
    res

) => {

    const tournament =
        await generateBracketService(

            req.params.id,

            req.user._id

        );

    res.status(200).json(

        new ApiResponse(

            "Bracket generated",

            tournament

        )

    );

});

export const getBracket = asyncHandler(async (req, res) => {

    const bracket = await getBracketService(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            "Bracket fetched successfully",
            bracket
        )
    );

});

export const getMyTournaments = asyncHandler(async (req, res) => {

    const tournaments =
        await getMyTournamentsService(req.user._id);

    res.status(200).json(

        new ApiResponse(

            "Host tournaments fetched",
            {
                tournaments
            }
        )

    );

});

export const checkTournamentEligibility = asyncHandler(

    async (req, res) => {

        const data =

            await checkTournamentEligibilityService(

                req.params.id,

                req.user._id

            );

        res.status(200).json(

            new ApiResponse(

                "Eligibility fetched",

                data

            )

        );

    }

);