import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "ACCEPTED",
                "REJECTED",
                "EXPIRED"
            ],
            default: "PENDING"
        },

        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
    },
    {
        timestamps: true
    }
);

invitationSchema.index(
    {
        team: 1,
        receiver: 1,
        status: 1
    },
    {
        unique: true,
        partialFilterExpression: {
            status: "PENDING"
        }
    }
);

const Invitation = mongoose.model(
    "Invitation",
    invitationSchema
);

export default Invitation;