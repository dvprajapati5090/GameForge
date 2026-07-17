import api from "../api/axios";

export const getMyTeam = async () => {

    const res = await api.get("/team/my-team");

    return res.data;

};

export const createTeam = async (data) => {

    const res = await api.post("/team", data);

    return res.data;

};

export const invitePlayer = async (username) => {

    const res = await api.post(
        "/team/invite",
        {
            username
        }
    );

    return res.data;

};

export const getInvitations = async () => {

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

export const updateTeam = async (data) => {

    const res = await api.patch(
        "/team",
        data
    );

    return res.data;

};

export const leaveTeam = async () => {

    const res = await api.post(
        "/team/leave"
    );

    return res.data;

};

export const removeMember = async (memberId) => {

    const res = await api.delete(
        `/team/members/${memberId}`
    );

    return res.data;

};

export const transferCaptain = async (memberId) => {

    const res = await api.patch(
        `/team/captain/${memberId}`
    );

    return res.data;

};