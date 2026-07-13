import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

import { teamDetailsQuery } from "../utils/teamQuery.js";

import Invitation from "../models/invitation.model.js";

export const createTeamService = async (teamData, userId) => {

    const {
        name,
        description = ""
    } = teamData;

    // Check if player already belongs to a team
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    if (user.team) {
        throw new ApiError(
            409,
            "You are already in a team"
        );
    }

    // Check duplicate team name
    const existingTeam = await Team.findOne({
        name
    });

    if (existingTeam) {
        throw new ApiError(
            409,
            "Team name already exists"
        );
    }

    // Create team
    const team = await Team.create({
        name,
        description,
        captain: user._id,
        members: [user._id],
        createdBy: user._id
    });

    // Update user's team
    user.team = team._id;
    await user.save();

    return await teamDetailsQuery(
        Team.findById(team._id)
    );

};

export const getMyTeamService = async (userId) => {

    const user = await User.findById(userId)
        .select("+team");

    if (!user.team) {
        throw new ApiError(
            404,
            "You are not part of any team"
        );
    }

    const team = await teamDetailsQuery(
        Team.findById(user.team)
    );

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    return team;
};

export const updateTeamService = async (userId,updateData) => {

    const user = await User.findById(userId)
        .select("+team");

    if (!user.team) {
        throw new ApiError(
            404,
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

    // Ownership Check
    if (team.captain.toString() !== user._id.toString()) {
        throw new ApiError(
            403,
            "Only the team captain can update the team"
        );
    }

    // Duplicate name check
    if (
        updateData.name &&
        updateData.name !== team.name
    ) {
        const existingTeam = await Team.findOne({
            name: updateData.name
        });

        if (existingTeam) {
            throw new ApiError(
                409,
                "Team name already exists"
            );
        }
    }

    Object.assign(team, updateData);

    await team.save();

    return await teamDetailsQuery(
        Team.findById(team._id)
    );
};

export const invitePlayerService = async (
    captainId,
    username
) => {

    // Captain
    const captain = await User.findById(captainId)
        .select("+team");

    if (!captain.team) {
        throw new ApiError(
            404,
            "You are not part of any team"
        );
    }

    // Team
    const team = await Team.findById(captain.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    // Ownership
    if (team.captain.toString() !== captain._id.toString()) {
        throw new ApiError(
            403,
            "Only the captain can invite players"
        );
    }

    // Capacity check
    if (team.members.length >= team.maxMembers) {
        throw new ApiError(
            400,
            "Team is already full"
        );
    }

    // Target user
    const receiver = await User.findOne({
        username: username.toLowerCase()
    }).select("+team");

    if (!receiver) {
        throw new ApiError(
            404,
            "Player not found"
        );
    }

    // Can't invite yourself
    if (receiver._id.toString() === captain._id.toString()) {
        throw new ApiError(
            400,
            "You cannot invite yourself"
        );
    }

    // Already in team
    if (receiver.team) {
        throw new ApiError(
            409,
            "Player already belongs to a team"
        );
    }

    // Existing invitation
    const existingInvitation = await Invitation.findOne({
        team: team._id,
        receiver: receiver._id,
        status: "PENDING"
    });

    if (existingInvitation) {
        throw new ApiError(
            409,
            "Invitation already sent"
        );
    }

    const invitation = await Invitation.create({
        team: team._id,
        sender: captain._id,
        receiver: receiver._id
    });

    return await Invitation.findById(invitation._id)
        .populate(
            "team",
            "name logo"
        )
        .populate(
            "sender",
            "username displayName"
        )
        .populate(
            "receiver",
            "username displayName"
        )
        .select("-__v");
};

export const getMyInvitationsService = async (userId) => {

    const invitations = await Invitation.find({
        receiver: userId,
        status: "PENDING",
        expiresAt: {
            $gt: new Date()
        }
    })
    .populate(
        "team",
        "name logo description"
    )
    .populate(
        "sender",
        "username displayName avatar"
    )
    .sort({
        createdAt: -1
    })
    .select("-receiver -__v");

    return invitations;
};

export const acceptInvitationService = async (
    invitationId,
    userId
) => {

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
        throw new ApiError(
            404,
            "Invitation not found"
        );
    }

    if (invitation.receiver.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not allowed to accept this invitation"
        );
    }

    if (invitation.status !== "PENDING") {
        throw new ApiError(
            400,
            "Invitation is no longer pending"
        );
    }

    if (invitation.expiresAt < new Date()) {
        throw new ApiError(
            400,
            "Invitation has expired"
        );
    }

    const user = await User.findById(userId);

    if (user.team) {
        throw new ApiError(
            409,
            "You already belong to a team"
        );
    }

    const team = await Team.findById(invitation.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    if (team.members.length >= team.maxMembers) {
        throw new ApiError(
            400,
            "Team is already full"
        );
    }

    // Accept invitation
    invitation.status = "ACCEPTED";
    await invitation.save();

    // Add player to team
    user.team = team._id;
    await user.save();

    team.members.push(user._id);
    await team.save();

    // Expire all other pending invitations
    await Invitation.updateMany(
        {
            receiver: user._id,
            status: "PENDING",
            _id: {
                $ne: invitation._id
            }
        },
        {
            status: "EXPIRED"
        }
    );

    return await teamDetailsQuery(
        Team.findById(team._id)
    );

};

export const rejectInvitationService = async (
    invitationId,
    userId
) => {

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
        throw new ApiError(
            404,
            "Invitation not found"
        );
    }

    if (invitation.receiver.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not allowed to reject this invitation"
        );
    }

    if (invitation.status !== "PENDING") {
        throw new ApiError(
            400,
            "Invitation is no longer pending"
        );
    }

    if (invitation.expiresAt < new Date()) {
        throw new ApiError(
            400,
            "Invitation has expired"
        );
    }

    invitation.status = "REJECTED";

    await invitation.save();

    return invitation;

};

export const leaveTeamService = async (userId) => {

    const user = await User.findById(userId)
        .select("+team");

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

    const isCaptain =
        team.captain.toString() === user._id.toString();

    // Captain
    if (isCaptain) {

        // Captain is alone
        if (team.members.length === 1) {

            await Team.findByIdAndDelete(team._id);

            user.team = null;
            await user.save();

            return {
                deleted: true
            };
        }

        // Captain has members
        throw new ApiError(
            400,
            "Transfer captaincy before leaving the team"
        );
    }

    // Normal member

    team.members = team.members.filter(
        member =>
            member.toString() !== user._id.toString()
    );

    await team.save();

    user.team = null;
    await user.save();

    return {
        deleted: false
    };
};

export const removeMemberService = async (
    captainId,
    memberId
) => {

    const captain = await User.findById(captainId)
        .select("+team");

    if (!captain.team) {
        throw new ApiError(
            400,
            "You are not part of any team"
        );
    }

    const team = await Team.findById(captain.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    // Only captain
    if (team.captain.toString() !== captain._id.toString()) {
        throw new ApiError(
            403,
            "Only the captain can remove members"
        );
    }

    // Captain can't remove himself
    if (captain._id.toString() === memberId) {
        throw new ApiError(
            400,
            "Captain cannot remove themselves"
        );
    }

    const member = await User.findById(memberId)
        .select("+team");

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    if (
        !team.members.some(
            id => id.toString() === member._id.toString()
        )
    ) {
        throw new ApiError(
            400,
            "Player is not a member of your team"
        );
    }

    team.members = team.members.filter(
        id => id.toString() !== member._id.toString()
    );

    await team.save();

    member.team = null;
    await member.save();

    return await teamDetailsQuery(
        Team.findById(team._id)
    );
};

export const transferCaptainService = async (
    captainId,
    newCaptainId
) => {

    const captain = await User.findById(captainId)
        .select("+team");

    if (!captain.team) {
        throw new ApiError(
            400,
            "You are not part of any team"
        );
    }

    const team = await Team.findById(captain.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    if (team.captain.toString() !== captain._id.toString()) {
        throw new ApiError(
            403,
            "Only the captain can transfer captaincy"
        );
    }

    if (captain._id.toString() === newCaptainId) {
        throw new ApiError(
            400,
            "You are already the captain"
        );
    }

    const newCaptain = await User.findById(newCaptainId);

    if (!newCaptain) {
        throw new ApiError(
            404,
            "Player not found"
        );
    }

    const isMember = team.members.some(
        member => member.toString() === newCaptain._id.toString()
    );

    if (!isMember) {
        throw new ApiError(
            400,
            "Player is not a member of your team"
        );
    }

    team.captain = newCaptain._id;

    await team.save();

    return await teamDetailsQuery(
        Team.findById(team._id)
    );

};