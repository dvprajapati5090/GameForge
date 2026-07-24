import mongoose from "mongoose";

const teamMessageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamChat",
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        text: {
            type: String,
            trim: true,
            maxlength: 1000,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const TeamMessage = mongoose.model(
    "TeamMessage",
    teamMessageSchema
);

export default TeamMessage;