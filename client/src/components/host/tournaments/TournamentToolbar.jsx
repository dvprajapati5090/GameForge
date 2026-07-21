import {
    Search,
    Plus
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function TournamentToolbar({

    search,

    setSearch

}) {

    const navigate = useNavigate();

    return (

        <div className="flex justify-between gap-6">

            <div className="relative flex-1">

                <Search
                    className="absolute left-4 top-3"
                    size={18}
                />

                <input

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    placeholder="Search Tournament..."

                    className="
                        w-full
                        rounded-xl
                        bg-slate-900
                        border
                        border-white/10
                        py-3
                        pl-11
                    "

                />

            </div>

            <button

                onClick={() =>
                    navigate("/host/create-tournament")
                }

                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    px-5
                    bg-gradient-to-r
                    from-cyan-500
                    to-purple-600
                "

            >

                <Plus size={18}/>

                Create

            </button>

        </div>

    );

}