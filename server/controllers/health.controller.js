import ApiResponse from "../utils/apiResponse.js";

export const getHealthStatus = (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            "GameForge Backend is running 🚀"
        )
    );
};