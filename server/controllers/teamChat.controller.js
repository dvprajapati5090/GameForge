import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {
    getTeamMessagesService,
    sendTeamMessageService
} from "../services/teamChat.service.js";

export const getMessages = asyncHandler(async (req, res) => {

    const messages = await getTeamMessagesService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            "Messages fetched successfully",
            messages
        )
    );

});

export const sendMessage = asyncHandler(async (req, res) => {

    const message = await sendTeamMessageService(

        req.user._id,

        req.body.message

    );

    return res.status(201).json(
        new ApiResponse(
            "Message sent",
            message
        )
    );

});