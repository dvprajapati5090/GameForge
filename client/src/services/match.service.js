import axiosInstance from "../api/axios";

export const updateMatch = async ({
    matchId,
    winnerId,
    scoreA,
    scoreB
}) => {

    const res = await axiosInstance.patch(
        `/matches/${matchId}`,
        {
            winnerId,
            scoreA,
            scoreB
        }
    );

    return res.data;
};