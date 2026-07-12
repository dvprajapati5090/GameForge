import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    // Read Authorization Header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(
            401,
            "Unauthorized request"
        );
    }

    // Extract Token
    const token = authHeader.replace("Bearer ", "");

    // Verify Token
    const decodedToken = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
    );

    // Find User
    const user = await User.findById(decodedToken._id)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(
            401,
            "Invalid Access Token"
        );
    }

    // Attach User
    req.user = user;

    next();

});

export default verifyJWT;