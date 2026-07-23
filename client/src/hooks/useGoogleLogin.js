import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useAuthStore from "../store/authStore";

import { googleLogin } from "../services/auth.service";

export default function useGoogleLogin() {

    const navigate = useNavigate();

    const {
        setUser,
        setAccessToken
    } = useAuthStore();


    return useMutation({

        mutationFn: googleLogin,


        onSuccess: ({data})=>{

            if(data.isNewUser){

                navigate("/register",{

                    state:{
                        googleData:data.googleData
                    }

                });

                return;

            }


            setUser(data.user);

            setAccessToken(data.accessToken);


            toast.success(
                "Welcome back to GameForge!"
            );


            navigate("/");

        },


        onError:(error)=>{


            toast.error(

                error.response?.data?.message ||

                "Google Sign-In failed"

            );

        }


    });

}