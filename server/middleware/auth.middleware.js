import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {

        throw new ApiError(
            401,
            "Unauthorized request"
        );

    }

    const token = authHeader.replace(
        "Bearer ",
        ""
    );

    let decodedToken;

    try {

        decodedToken = jwt.verify(

            token,

            process.env.JWT_ACCESS_SECRET

        );

    }

    catch (error) {

        if (error.name === "TokenExpiredError") {

            throw new ApiError(
                401,
                "Access token expired"
            );

        }

        throw new ApiError(
            401,
            "Invalid access token"
        );

    }

    const user = await User.findById(
        decodedToken._id
    ).select("-password -refreshToken");

    if (!user) {

        throw new ApiError(
            401,
            "User not found"
        );

    }

    req.user = user;

    next();

});

export const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return next(

                new ApiError(

                    403,

                    "Forbidden"

                )

            );

        }

        next();

    };

};

export default verifyJWT;