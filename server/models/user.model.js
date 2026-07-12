
//1. Imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//2. Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 20,
            match: [
                /^[a-zA-Z0-9._-]{3,20}$/,
                "Username can only contain letters, numbers, '.', '_' and '-'"
            ]
        },

        displayName: {
            type: String,
            required: [true, "Display name is required"],
            trim: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false
        },

        role: {
            type: String,
            enum: ["PLAYER", "HOST"],
            default: "PLAYER"
        },

        avatar: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            maxlength: 250,
            default: ""
        },

        riotGameName: {
            type: String,
            trim: true,
            default: ""
        },

        riotTagLine: {
            type: String,
            trim: true,
            default: ""
        },

        region: {
            type: String,
            default: ""
        },

        preferredRole: {
            type: String,
            enum: [
                "",
                "DUELIST",
                "INITIATOR",
                "CONTROLLER",
                "SENTINEL",
                "FLEX"
            ],
            default: ""
        },

        currentRank: {
            type: String,
            default: ""
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        refreshToken: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

// 3. Middleware
userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});

// 4. Instance Methods

// Compare Password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

// 5. Create Model
const User = mongoose.model("User", userSchema);

// 6. Export
export default User;