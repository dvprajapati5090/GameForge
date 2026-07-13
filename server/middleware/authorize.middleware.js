import ApiError from "../utils/ApiError.js";

const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return next(
                new ApiError(
                    401,
                    "Unauthorized request"
                )
            );
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    "You are not allowed to perform this action"
                )
            );
        }

        next();
    };
};

export default authorizeRoles;