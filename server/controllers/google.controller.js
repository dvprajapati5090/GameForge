import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import { googleLoginService, completeGoogleProfileService } from "../services/google.service.js";

import User from "../models/user.model.js";

export const googleLogin = asyncHandler(
async(req,res)=>{


    const data = await googleLoginService(
        req.body.token
    );


    if(data.isNewUser){

        return res.status(200).json(

            new ApiResponse(
                200,
                {
                    isNewUser:true,
                    googleData:data.googleData
                },
                "Complete Google registration"
            )

        );

    }



    res.cookie(
        "refreshToken",
        data.refreshToken,
        {
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:15*24*60*60*1000
        }
    );


    return res.status(200).json(

        new ApiResponse(

            200,

            {
                isNewUser: data.isNewUser,

                googleData: data.googleData,

                user: data.user,

                accessToken: data.accessToken

            },

            "Google login successful"

        )

    );


});

export const completeGoogleProfile = asyncHandler(async(req,res)=>{


    const user =
        await completeGoogleProfileService(
            req.body
        );


    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();

    const safeUser =
        await User.findById(user._id)
            .select("-password -refreshToken");

    res.cookie(
        "refreshToken",
        refreshToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 24 * 60 * 60 * 1000
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: safeUser,
                accessToken
            },
            "Google profile completed"
        )
    );


});