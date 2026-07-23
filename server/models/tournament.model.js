import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        game: {
            type: String,
            enum: [
                "VALORANT",
                "BGMI",
                "FREE_FIRE"
            ],
            required: true
        },

        mode: {
            type: String,
            enum: [
                "SOLO",
                "DUO",
                "SQUAD",
                "5V5"
            ],
            required: true
        },

        format: {
            type: String,
            enum: [
                "SINGLE_ELIMINATION",
                "DOUBLE_ELIMINATION"
            ],
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        banner: {
            type: String,
            default: ""
        },

        bannerPublicId: {
            type: String,
            default: ""
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        registeredTeams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team"
            }
        ],

        registrationCount: {
            type: Number,
            default: 0
        },

        isPublic: {
            type: Boolean,
            default: true
        },

        maxTeams: {
            type: Number,
            required: true,
            min: 2
        },

        registrationStart: {
            type: Date,
            required: true
        },

        registrationEnd: {
            type: Date,
            required: true
        },

        tournamentStart: {
            type: Date,
            required: true
        },

        tournamentEnd: {
            type: Date
        },

        prizePool: {
            type: Number,
            default: 0
        },

        rules: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "DRAFT",
                "REGISTRATION_OPEN",
                "REGISTRATION_CLOSED",
                "LIVE",
                "COMPLETED",
                "CANCELLED"
            ],
            default: "DRAFT"
        },

        bracketGenerated: {
            type: Boolean,
            default: false
        },

        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Tournament = mongoose.model(
    "Tournament",
    tournamentSchema
);

export default Tournament;