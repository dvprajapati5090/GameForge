import api from "../api/axios";

export const getMessages = async () => {

    const { data } = await api.get(
        "/team-chat"
    );

    return data;

};

export const sendMessage = async (text) => {

    const { data } = await api.post(

        "/team-chat",

        {
            text
        }

    );

    return data;

};