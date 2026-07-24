import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

import {
    emitTeamMessage
} from "../socket/socketManager.js";

export const getMessagesService = async (userId) => {

    const user = await User.findById(userId).select("+team");

    if (!user.team) {

        throw new ApiError(
            404,
            "You are not in any team"
        );

    }

    const chat = await Chat.findOne({
        team: user.team
    });

    if (!chat) {

        throw new ApiError(
            404,
            "Chat not found"
        );

    }

    return await Message.find({

        chat: chat._id

    })
        .populate(
            "sender",
            "username displayName avatar riotCard"
        )
        .sort({
            createdAt: 1
        });

};

export const sendMessageService = async (

    userId,

    text

) => {

    const user = await User.findById(userId).select("+team");

    if (!user.team) {

        throw new ApiError(
            404,
            "You are not in any team"
        );

    }

    let chat = await Chat.findOne({
        team: user.team
    });

    if (!chat) {

        chat = await Chat.create({
            team: user.team
        });

    }

    const message = await Message.create({

        chat: chat._id,

        sender: user._id,

        text: text      // <-- or text if your schema uses text

    });

    const populatedMessage = await Message.findById(
        message._id
    ).populate(
        "sender",
        "username displayName avatar riotCard"
    );

    emitTeamMessage(
        user.team,
        populatedMessage
    );

    return populatedMessage;

};