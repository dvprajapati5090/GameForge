import Notification from "../models/notification.model.js";

import { getIO } from "../socket/socketManager.js";

export const createNotification = async (
    user,
    title,
    message,
    type = "SYSTEM",
    link = "",
    invitation = null
) => {

    const notification = await Notification.create({
        user,
        title,
        message,
        type,
        link,
        invitation
    });

    const populatedNotification = await Notification.findById(notification._id)
        .populate({
            path: "invitation",
            populate: [
                {
                    path: "team",
                    select: "name"
                },
                {
                    path: "sender",
                    select: "username displayName"
                }
            ]
        });


    const io = getIO();

    console.log("Sending notification to:", user.toString());

    if (io) {

        console.log("Socket emit notification");

        io.to(user.toString()).emit(
            "notification:new",
            populatedNotification
        );

    }

    return populatedNotification;
};

export const getNotificationsService = async (userId) => {

    return await Notification.find({

        user: userId

    })
        .populate("invitation")
        .sort({

            createdAt: -1

        });

};

export const markNotificationReadService = async (

    notificationId,

    userId

) => {

    return await Notification.findOneAndUpdate(

        {

            _id: notificationId,

            user: userId

        },

        {

            isRead: true

        },

        {

            new: true

        }

    );

};

export const markAllNotificationsReadService = async (

    userId

) => {

    await Notification.updateMany(

        {

            user: userId,

            isRead: false

        },

        {

            isRead: true

        }

    );

};