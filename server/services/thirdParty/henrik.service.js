import axios from "axios";
import ApiError from "../../utils/ApiError.js";

const henrikClient = axios.create({
    baseURL: process.env.HENRIK_BASE_URL,
    headers: {
        Authorization: process.env.HENRIK_API_KEY
    },
    timeout: 10000
});

export const getAccountDetails = async (
    gameName,
    tagLine
) => {

    try {

        const response = await henrikClient.get(
            `/valorant/v2/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
        );

        return response.data.data;

    } catch (error) {

        console.log("========== HENRIK ERROR ==========");
        console.log("Message:", error.message);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
        } else {
            console.log(error);
        }

        console.log("==================================");

        if (error.response) {

            throw new ApiError(
                error.response.status,
                error.response.data?.errors?.[0]?.message ||
                "Failed to fetch Riot account."
            );
        }

        throw new ApiError(
            500,
            "Unable to connect to Henrik API."
        );
    }
};

export const getMMRDetails = async (
    region,
    gameName,
    tagLine
) => {

    try {

        const response = await henrikClient.get(
            `/valorant/v2/mmr/${region}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
        );

        return response.data.data;

    } catch (error) {

        console.log("========== HENRIK MMR ERROR ==========");
        console.log("Message:", error.message);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
        }

        console.log("======================================");

        throw new ApiError(
            error.response?.status || 500,
            error.response?.data?.errors?.[0]?.message ||
            "Unable to fetch MMR."
        );
    }

};
