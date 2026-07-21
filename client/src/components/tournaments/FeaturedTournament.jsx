import { Link } from "react-router-dom";
import {
    Trophy,
    Calendar,
    Users,
    ArrowRight
} from "lucide-react";

export default function FeaturedTournament({

    tournament

}) {

    if (!tournament) return null;

    return (

        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                mb-10
                h-[340px]
            "
        >

            <img
                src={
                    tournament.banner ||
                    "https://placehold.co/1400x500/0f172a/ffffff?text=GameForge"
                }
                alt={tournament.name}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-slate-950
                    via-slate-950/80
                    to-transparent
                "
            />

            <div className="relative z-10 p-10 max-w-xl">

                <span
                    className="
                        inline-block
                        bg-yellow-500/20
                        text-yellow-400
                        px-4
                        py-2
                        rounded-full
                        mb-5
                    "
                >

                    🔥 Featured Tournament

                </span>

                <h2 className="text-5xl font-bold">

                    {tournament.name}

                </h2>

                <p className="mt-4 text-gray-300">

                    {tournament.description}

                </p>

                <div className="flex gap-8 mt-8">

                    <div className="flex items-center gap-2">

                        <Trophy size={20}/>

                        ₹ {tournament.prizePool}

                    </div>

                    <div className="flex items-center gap-2">

                        <Users size={20}/>

                        {tournament.registrationCount} / {tournament.maxTeams}

                    </div>

                    <div className="flex items-center gap-2">

                        <Calendar size={20}/>

                        {

                            new Date(
                                tournament.tournamentStart
                            ).toLocaleDateString()

                        }

                    </div>

                </div>

                <Link

                    to={`/tournaments/${tournament._id}`}

                    className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        bg-cyan-500
                        hover:bg-cyan-400
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "

                >

                    View Tournament

                    <ArrowRight size={18}/>

                </Link>

            </div>

        </div>

    );

}