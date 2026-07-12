import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            next(
                new ApiError(
                    400,
                    "Validation Failed",
                    error.issues
                )
            );
        }
    };
};

export default validate;