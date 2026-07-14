import api from "../api/axios";

export const updateProfile = async (data) => {

    const response = await api.patch(
        "/profile",
        data
    );

    return response.data;

};