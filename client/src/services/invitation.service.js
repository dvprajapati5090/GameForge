import api from "../api/axios";

export const getMyInvitations = async () => {

    const res = await api.get("/team/invitations");

    return res.data;

};

export const acceptInvitation = async (id) => {

    const res = await api.post(
        `/team/invitations/${id}/accept`
    );

    return res.data;

};

export const rejectInvitation = async (id) => {

    const res = await api.post(
        `/team/invitations/${id}/reject`
    );

    return res.data;

};