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
                    border-white/20

                    bg-gradient-to-r
                    from-black
                    via-white/5
                    to-black

                    text-white
                    font-semibold
                    text-lg

                    transition-all
                    duration-300

                    hover:border-white/20
                    hover:from-black
                    hover:to-black

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