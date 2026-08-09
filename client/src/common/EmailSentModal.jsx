import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";

export default function EmailSentModal({

    open,

    onClose,

    seconds = 8

}) {

    const [count, setCount] = useState(seconds);

    useEffect(() => {

        if (!open) return;

        setCount(seconds);

        const interval = setInterval(() => {

            setCount(prev => {

                if (prev <= 1) {

                    clearInterval(interval);

                    onClose();

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [open]);

    if (!open) return null;

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                backdrop-blur-md
            "
        >

            <div
                className="
                    w-[420px]
                    rounded-3xl
                    border
                    border-[#e8003d]/20
                    bg-white/10
                    backdrop-blur-xl
                    p-8
                    text-center
                    shadow-2xl
                "
            >

                <MailCheck
                    className="
                        mx-auto
                        text-green-400
                    "
                    size={60}
                />

                <h2
                    className="
                        mt-5
                        text-2xl font-bold font-mono
                        text-white
                    "
                >
                    Email Sent
                </h2>

                <p
                    className="
                        mt-4
                        text-gray-300
                    "
                >
                    We've sent a verification email to your inbox.
                </p>

                <p
                    className="
                        mt-2
                        text-gray-400
                    "
                >
                    Please verify your email before logging in.
                </p>

                <div
                    className="
                        mt-6
                        text-white
                        font-semibold
                    "
                >
                    Redirecting in {count}s...
                </div>

            </div>

        </div>

    );

}