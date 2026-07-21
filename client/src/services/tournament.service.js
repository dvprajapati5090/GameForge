import api from "../api/axios";

export const getTournaments = async (params = {}) => {

    const res = await api.get(
        "/tournaments",
        {
            params
        }
    );

    return res.data;

};

export const createTournament = async (data) => {

    const res = await api.post(
        "/tournaments",
        data
    );

    return res.data;

};

export const updateTournament = async (
    id,
    data
) => {

    const res = await api.patch(
        `/tournaments/${id}`,
        data
    );

    return res.data;

};

export const deleteTournament = async (id) => {

    const res = await api.delete(
        `/tournaments/${id}`
    );

    return res.data;

};

export const registerTournament = async (id) => {

    const res = await api.post(
        `/tournaments/${id}/register`
    );

    return res.data;

};

export const withdrawTournament = async (id) => {

    const { data } = await api.patch(

        `/tournaments/${id}/withdraw`

    );

    return data;

};

export const completeTournament = async (
    id,
    winnerTeamId
) => {

    const res = await api.patch(
        `/tournaments/${id}/complete`,
        {
            winnerTeamId
        }
    );

    return res.data;

};

export const updateMatch = async (
    matchId,
    data
) => {

    const res = await api.patch(
        `/matches/${matchId}`,
        data
    );

    return res.data;

};

export const getTournament = async (id) => {

    const res = await api.get(

        `/tournaments/${id}`

    );

    return res.data;

};

export const generateBracket = async (id) => {

    const res = await api.post(
        `/tournaments/${id}/generate-bracket`
    );

    return res.data;

};

export const getBracket = async (id) => {

    const res = await api.get(
        `/tournaments/${id}/bracket`
    );

    return res.data;

};

export const getMyTournaments = async () => {

    const { data } = await api.get(
        "/tournaments/host/my"
    );

    return data;

};

export const checkEligibility = async (id) => {

    const { data } = await api.get(
        `/tournaments/${id}/eligibility`
    );

    return data;
};