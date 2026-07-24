import api from "../api/axios";

export const createOrder = async (tournamentId) => {

    const { data } = await api.post(
        "/payments/create-order",
        {
            tournamentId
        }
    );

    return data;
};

export const verifyPayment = async (data) => {

    const res = await api.post(

        "/payments/verify",

        data

    );

    return res.data;

};