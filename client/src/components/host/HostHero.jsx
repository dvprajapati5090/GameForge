import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

export default function HostHero() {

    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);

    return (

        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                p-10

                bg-gradient-to-r
                from-[#0F172A]
                via-[#132B4F]
                to-[#312E81]

                border
                border-white/10
            "
        >

            <div
                className="
                    absolute
                    -right-24
                    -top-24
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-500/20
                    blur-3xl
                "
            />

            <h1 className="text-5xl font-black">

                Welcome,

                <span className="text-cyan-400">

                    {" "}{user.displayName}

                </span>

            </h1>

            <p className="mt-4 text-gray-300 max-w-2xl">

                Organize tournaments, manage registrations,
                generate brackets and monitor live events
                from one place.

            </p>

            <button

                onClick={() =>
                    navigate("/host/create-tournament")
                }

                className="
                    mt-8

                    flex
                    items-center
                    gap-3

                    rounded-2xl

                    bg-cyan-500

                    px-7
                    py-4

                    font-bold

                    hover:bg-cyan-400
                    transition
                "

            >

                <PlusCircle size={20} />

                Create Tournament

            </button>

        </section>

    );

}