class ApiResponse {

    constructor(
        statusCode,
        data = null,
        message = "Success"
    ) {
        if (typeof statusCode === "string") {
            message = statusCode;
            statusCode = 200;
        }

        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

}

export default ApiResponse;
