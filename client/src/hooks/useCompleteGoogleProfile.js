import {useMutation} from "@tanstack/react-query";

import {useNavigate} from "react-router-dom";

import toast from "react-hot-toast";

import useAuthStore from "../store/authStore";

import {
    completeGoogleProfile
} from "../services/google.service";


export default function useCompleteGoogleProfile(){

    const navigate = useNavigate();


    const {
        setUser,
        setAccessToken
    } = useAuthStore();



    return useMutation({

        mutationFn:
            completeGoogleProfile,


        onSuccess:({data})=>{


            setUser(
                data.user
            );


            setAccessToken(
                data.accessToken
            );


            toast.success(
                "Welcome to GameForge 🎮"
            );


            navigate("/");

        },


        onError:(error)=>{


            toast.error(

                error.response?.data?.message ||

                "Profile completion failed"

            );


        }

    });

}