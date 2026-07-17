import api from "../api/axios";

export const getPlayers = async () => {

    const res = await api.get("/players");

    return res.data;

};

export const getPlayer = async (username) => {

    const res = await api.get(`/players/${username}`);

    return res.data;

};