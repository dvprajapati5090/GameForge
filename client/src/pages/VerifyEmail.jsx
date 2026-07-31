import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

export default function VerifyEmail() {

    const { token } = useParams();

    const navigate = useNavigate();

    const hasVerified = useRef(false);

    const [loading, setLoading] = useState(true);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        if (hasVerified.current) return;

        hasVerified.current = true;

        const verifyEmail = async () => {

            try {

                const response = await api.get(
                    `/auth/verify-email/${token}`
                );

                setSuccess(true);

                setMessage(
                    "Your email has been verified successfully."
                );

                setTimeout(() => {

                    navigate("/login");

                }, 2500);

            }

            catch (error) {

                setSuccess(false);

                if (error.response?.status === 400) {

                    setMessage(
                        "This verification link is invalid or has expired."
                    );

                }

                else {

                    setMessage(
                        "Something went wrong. Please try again later."
                    );

                }

            }

            finally {

                setLoading(false);

            }

        };

        verifyEmail();

    }, [token, navigate]);

    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-[#0B1020]
                text-white
                px-6
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#121A2B]
                    p-8
                    text-center
                "
            >

                {loading ? (

                    <>
                        <h1 className="text-2xl font-bold">
                            Verifying Email...
                        </h1>

                        <p className="mt-4 text-gray-400">
                            Please wait while we verify your email.
                        </p>
                    </>

                ) : success ? (

                    <>
                        <h1 className="text-3xl font-bold text-green-400">
                            🎉 Email Verified
                        </h1>

                        <p className="mt-4 text-gray-300">
                            {message}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Redirecting to login...
                        </p>
                    </>

                ) : (

                    <>
                        <h1 className="text-3xl font-bold text-red-400">
                            Verification Failed
                        </h1>

                        <p className="mt-4 text-gray-300">
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="
                                mt-6
                                rounded-xl
                                bg-violet-600
                                px-5
                                py-2
                                hover:bg-violet-500
                            "
                        >
                            Back to Login
                        </button>
                    </>

                )}

            </div>

        </div>

    );

}