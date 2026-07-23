import api from "../api/axios";

export const updateProfile = async (formData) => {

    const response = await api.patch(

        "/profile",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};