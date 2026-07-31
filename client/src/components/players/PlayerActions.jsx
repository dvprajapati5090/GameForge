import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlayerActions({ player }) {

    return (

        <div className="flex mt-5">

            <Link
                to={`/players/${player.username}`}
                className="
                    group
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3

                    py-3.5

                    rounded-2xl

                    border
                    border-violet-500/30

                    bg-gradient-to-r
                    from-violet-600/15
                    via-violet-500/10
                    to-fuchsia-600/15

                    text-violet-200
                    font-semibold
                    text-lg

                    transition-all
                    duration-300

                    hover:border-violet-400/60
                    hover:from-violet-500/25
                    hover:to-fuchsia-500/20

                    hover:text-white
                    hover:shadow-[0_0_30px_rgba(139,92,246,.25)]
                "
            >

                <Eye
                    size={20}
                    className="transition-colors duration-300 group-hover:text-white"
                />

                View Profile

            </Link>

        </div>

    );

}