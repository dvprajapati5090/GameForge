import { PlusCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function EmptyState() {

    const navigate = useNavigate();

    return (

        <div
            className="
                rounded-3xl
                border
                border-dashed
                border-white/10
                bg-slate-900
                p-16
                text-center
            "
        >

            <PlusCircle

                size={70}

                className="mx-auto text-cyan-400"

            />

            <h2 className="text-3xl font-black mt-6">

                No tournaments yet

            </h2>

            <p className="text-gray-400 mt-3">

                Create your first tournament and start hosting competitions.

            </p>

            <button

                onClick={() =>
                    navigate("/host/create-tournament")
                }

                className="
                    mt-8
                    rounded-xl
                    px-8
                    py-3
                    bg-gradient-to-r
                    from-cyan-500
                    to-purple-600
                    font-bold
                "

            >

                Create Tournament

            </button>

        </div>

    );

}