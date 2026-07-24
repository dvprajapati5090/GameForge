import Team from "../models/team.model.js";
import TeamChat from "../models/teamChat.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getTeamMessagesService = async (userId) => {

    const user = await User.findById(userId).select("+team");

    if (!user.team) {
        throw new ApiError(
            404,
            "You are not in any team"
        );
    }

    return await TeamChat.find({
        team: user.team
    })
        .populate(
            "sender",
            "username displayName avatar"
        )
        .sort({
            createdAt: 1
        });

};

export const sendTeamMessageService = async (
    userId,
    message
) => {

    const user = await User.findById(userId).select("+team");

    if (!user.team) {
        throw new ApiError(
            404,
            "You are not in any team"
        );
    }

    const team = await Team.findById(user.team);

    if (!team) {
        throw new ApiError(
            404,
            "Team not found"
        );
    }

    const chat = await TeamChat.create({

        team: team._id,

        sender: user._id,

        message

    });

    return await TeamChat.findById(chat._id)
        .populate(
            "sender",
            "username displayName avatar"
        );

};