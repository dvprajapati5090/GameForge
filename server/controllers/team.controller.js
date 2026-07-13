import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    createTeamService,
    getMyTeamService,
    updateTeamService,
    invitePlayerService,
    getMyInvitationsService,
    acceptInvitationService
} from "../services/team.service.js";

export const createTeam = asyncHandler(async (req, res) => {

    const team = await createTeamService(
        req.body,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            "Team created successfully",
            team
        )
    );

});

export const getMyTeam = asyncHandler(async (req, res) => {

    const team = await getMyTeamService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            "Team fetched successfully",
            team
        )
    );

});

export const updateTeam = asyncHandler(async (req, res) => {

    const team = await updateTeamService(
        req.user._id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            "Team updated successfully",
            team
        )
    );

});

export const invitePlayer = asyncHandler(async (req, res) => {

    const invitation = await invitePlayerService(
        req.user._id,
        req.body.username
    );

    return res.status(201).json(
        new ApiResponse(
            "Invitation sent successfully",
            invitation
        )
    );

});

export const getMyInvitations = asyncHandler(async (req, res) => {

    const invitations = await getMyInvitationsService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            "Invitations fetched successfully",
            invitations
        )
    );

});

export const acceptInvitation = asyncHandler(async (req, res) => {

    const team = await acceptInvitationService(
        req.params.id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            "Invitation accepted successfully",
            team
        )
    );

});