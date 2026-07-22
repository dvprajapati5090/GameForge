import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/apiResponse.js";

import {

    getNotificationsService,

    markNotificationReadService,

    markAllNotificationsReadService

} from "../services/notification.service.js";

export const getNotifications = asyncHandler(

    async (req, res) => {

        const notifications =

            await getNotificationsService(

                req.user._id

            );

        return res.status(200).json(

            new ApiResponse(

                200,

                notifications,

                "Notifications fetched successfully"

            )

        );

    }

);

export const markNotificationRead = asyncHandler(

    async (req, res) => {

        const notification =

            await markNotificationReadService(

                req.params.id,

                req.user._id

            );

        return res.status(200).json(

            new ApiResponse(

                200,

                notification,

                "Notification marked as read"

            )

        );

    }

);

export const markAllNotificationsRead = asyncHandler(

    async (req, res) => {

        await markAllNotificationsReadService(

            req.user._id

        );

        return res.status(200).json(

            new ApiResponse(

                200,

                null,

                "All notifications marked as read"

            )

        );

    }

);