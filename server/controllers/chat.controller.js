import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import {

    getMessagesService,

    sendMessageService

} from "../services/chat.service.js";

export const getMessages = asyncHandler(async (req, res) => {

    const messages = await getMessagesService(
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

    const message = await sendMessageService(

        req.user._id,

        req.body.text

    );

    return res.status(201).json(

        new ApiResponse(
            "Message sent",
            message
        )

    );

});