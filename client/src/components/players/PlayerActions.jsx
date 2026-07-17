import { Eye, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlayerActions({ player }) {

    return (

        <div className="flex gap-3 mt-6">

            <Link
                to={`/players/${player.username}`}
                className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    bg-cyan-500/10
                    border
                    border-cyan-400/20
                    text-cyan-300
                    hover:bg-cyan-500/20
                    hover:border-cyan-400
                    transition-all
                    duration-300
                "
            >
                <Eye size={18} />
                View Profile
            </Link>

            <button
                className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    bg-purple-500/10
                    border
                    border-purple-400/20
                    text-purple-300
                    hover:bg-purple-500/20
                    hover:border-purple-400
                    transition-all
                    duration-300
                "
            >
                <UserPlus size={18} />
                Invite
            </button>

        </div>

    );

}