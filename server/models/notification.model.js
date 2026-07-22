import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "INVITATION",
                "ACHIEVEMENT",
                "MATCH_READY",
                "TOURNAMENT",
                "RIOT",
                "TEAM",
                "SYSTEM"
            ],
            default: "SYSTEM"
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        link: {
            type: String,
            default: ""
        },

        invitation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invitation",
            default: null
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

export default Notification;