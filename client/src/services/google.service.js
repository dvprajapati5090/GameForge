import api from "../api/axios";


export const completeGoogleProfile = async(data)=>{

    const res = await api.patch(
        "/auth/google/complete-profile",
        data
    );


    return res.data;

};