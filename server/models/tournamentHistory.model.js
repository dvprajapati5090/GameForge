import mongoose from "mongoose";

const tournamentHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },

        placement: {
            type: String,
            enum: [
                "CHAMPION",
                "RUNNER_UP",
                "TOP_4",
                "TOP_8",
                "PARTICIPANT"
            ],
            default: "PARTICIPANT"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "TournamentHistory",
    tournamentHistorySchema
);