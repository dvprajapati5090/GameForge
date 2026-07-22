import api from "../api/axios";

export const getPlayers = async () => {

    const res = await api.get("/players");

    return res.data;

};

export const getPlayer = async (username) => {

    const res = await api.get(`/players/${username}`);

    return res.data;

};

export const getPlayerCareer = async (playerId) => {

    const { data } = await api.get(

        `/players/${playerId}/career`

    );

    return data.data;

};

export const getLeaderboard = async (params = {}) => {

    const { data } = await api.get(

        "/players/leaderboard",

        {

            params

        }

    );

    return data;

};