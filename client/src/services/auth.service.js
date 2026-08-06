import api from "../api/axios";

export const loginUser = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const googleLogin = async (credential) => {

    const res = await api.post(

        "/auth/google",

        {

            token: credential

        }

    );

    return res.data;

};

export const register = async (data) => {
    const res = await api.post("/auth/register",data);
    return res.data;
};

export const logoutUser = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};

export const refreshToken = async () => {
    const res = await api.post("/auth/refresh-token");
    return res.data;
};

export const checkUsernameAvailability = async (username) => {

    const res = await api.get(
        `/auth/check-username?username=${username}`
    );

    return res.data;

};

export const checkEmailAvailability = async (email) => {

    const res = await api.get(
        `/auth/check-email?email=${email}`
    );

    return res.data;

};

export const verifyRiot = async (data) => {

    const res = await api.post(
        "/auth/verify-riot",
        data
    );

    return res.data;

};

export const changePassword = (data) =>

    api.patch(

        "/auth/change-password",

        data

    );

export const deleteAccount = async ({ password }) => {

    const { data } = await api.delete(

        "/auth/delete-account",

        {
            data: {
                password
            }
        }

    );

    return data;

};

// ─── Forgot Password Flow ─────────────────────────────────────
export const getSecurityQuestion = async (email) => {
    const res = await api.get(`/auth/security-question?email=${encodeURIComponent(email)}`);
    return res.data;
};

export const forgotPassword = async (data) => {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
};

export const resetPassword = async ({ token, newPassword }) => {
    const res = await api.post(`/auth/reset-password/${token}`, { newPassword });
    return res.data;
};

export const saveSecurityQuestion = async (data) => {
    const res = await api.patch("/auth/security-question", data);
    return res.data;
};