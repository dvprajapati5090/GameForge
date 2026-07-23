import { OAuth2Client } from "google-auth-library";

import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import { generateUniqueUsername } from "../utils/generateUniqueUsername.js";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

import { verifyRiotAccountService } from "./auth.service.js";

export const googleLoginService = async (token) => {

    if (!token) {

        throw new ApiError(
            400,
            "Google token is required"
        );

    }

    const ticket = await client.verifyIdToken({

        idToken: token,

        audience: process.env.GOOGLE_CLIENT_ID

    });

    const payload = ticket.getPayload();

    const {

        sub,
        email,
        name,
        picture,
        email_verified

    } = payload;

    if (!email_verified) {

        throw new ApiError(
            401,
            "Google email is not verified"
        );

    }

    let user = await User.findOne({

        email

    });

    // First Google login
    if(!user){

        return {

            isNewUser:true,

            googleData:{
                googleId: sub,
                email,
                displayName:name,
                avatar:picture
            }

        };

    }

    // Existing LOCAL account
    else if (

        !user.googleId

    ) {

        user.googleId = sub;

        if (

            !user.authProviders.includes("GOOGLE")

        ) {

            user.authProviders.push("GOOGLE");

        }

        user.isVerified = true;

        await user.save();

    }

    // Existing Google account
    else if (

        user.googleId &&
        user.googleId !== sub

    ) {

        throw new ApiError(

            401,

            "Google account mismatch"

        );

    }

    const accessToken =
        user.generateAccessToken();

    const refreshToken =
        user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();

    const safeUser = await User.findById(

        user._id

    ).select(

        "-password -refreshToken"

    );

    if(!user.profileCompleted){

        return {

            isNewUser:true,

            googleData:{
                googleId:user.googleId,
                email:user.email,
                displayName:user.displayName,
                avatar:user.avatar
            }

        };

    }


    return {

        isNewUser:false,

        user:safeUser,

        accessToken,

        refreshToken

    };

};

export const completeGoogleProfileService = async (data) => {

    const {
        googleId,
        email,
        displayName,
        avatar,

        username,
        role,

        gameName,
        tagLine,
        region

    } = data;


    const existingUser = await User.findOne({
        email
    });


    if(existingUser){

        throw new ApiError(
            409,
            "User already exists"
        );

    }


    let riotData = {};


    if(role === "PLAYER"){

        riotData = await verifyRiotAccountService({

            gameName,

            tagLine,

            region

        });

    }



    const user = await User.create({

        username,

        displayName,

        email,

        role,


        googleId,

        avatar,


        authProviders:[
            "GOOGLE"
        ],


        emailVerified:true,


        profileCompleted:true,


        ...(role === "PLAYER" && {

            riotGameName: riotData.gameName,

            riotTagLine: riotData.tagLine,

            region: riotData.region,

            puuid: riotData.puuid,

            riotVerified: riotData.verified,

            accountLevel: riotData.level,

            currentRank: riotData.currentRank,

            rankRating: riotData.rankRating,

            highestRank: riotData.highestRank,

            riotCard: riotData.playerCard,

            riotTitle: riotData.playerTitle,

            syncStatus:"SYNCED",

            riotLastSyncedAt:new Date()

        })

    });



    return user;

};