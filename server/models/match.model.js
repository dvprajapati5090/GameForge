import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(

    {

        tournament: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Tournament",

            required: true

        },

        round: {

            type: Number,

            required: true

        },

        matchNumber: {

            type: Number,

            required: true

        },

        teamA: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Team",

            default: null

        },

        teamB: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Team",

            default: null

        },

        winner: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Team",

            default: null

        },

        scoreA: {
            type: Number,
            default: 0
        },

        scoreB: {
            type: Number,
            default: 0
        },

        completedAt: {
            type: Date,
            default: null
        },

        status: {

            type: String,

            enum: [

                "PENDING",

                "READY",

                "LIVE",

                "COMPLETED"

            ],

            default: "PENDING"

        },

        nextMatch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
            default: null
        },

        nextMatchSlot: {
            type: String,
            enum: ["teamA", "teamB"],
            default: null
        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model(
    "Match",
    matchSchema
);