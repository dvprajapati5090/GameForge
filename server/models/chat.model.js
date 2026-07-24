import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
            unique: true
        },

        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "Chat",
    chatSchema
);