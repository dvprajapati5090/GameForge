import RegistrationProgress from "./RegistrationProgress";
import StatusBadge from "./StatusBadge";

import {
    Calendar,
    Trophy,
    Users
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function HostTournamentCard({

    tournament

}) {

    const navigate = useNavigate();

    return (

        <div
            className="
                rounded-3xl
                bg-slate-900
                border
                border-white/10
                p-6
                hover:border-cyan-500
                transition
            "
        >

            <div className="flex justify-between">

                <h2 className="text-2xl font-black">

                    {tournament.name}

                </h2>

                <StatusBadge
                    status={tournament.status}
                />

            </div>

            <p className="mt-3 text-gray-400">

                {tournament.description}

            </p>

            <div className="mt-6">

                <RegistrationProgress

                    registered={tournament.registrationCount}

                    maxTeams={
                        tournament.maxTeams
                    }

                />

            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">

                <Info

                    icon={<Users size={18}/>}

                    value={`${tournament.maxTeams} Teams`}

                />

                <Info

                    icon={<Trophy size={18}/>}

                    value={`₹${tournament.prizePool}`}

                />

                <Info

                    icon={<Calendar size={18}/>}

                    value={
                        new Date(tournament.tournamentStart)
                            .toLocaleDateString()
                    }

                />

            </div>

            <button

                onClick={() => {
                    navigate(`/host/tournaments/${tournament._id}`);
                }}

                className="
                    mt-8
                    w-full
                    rounded-xl
                    py-3
                    bg-gradient-to-r
                    from-cyan-500
                    to-purple-600
                    font-bold
                "

            >

                Manage Tournament

            </button>

        </div>

    );

}

function Info({

    icon,

    value

}) {

    return (

        <div className="flex items-center gap-2">

            {icon}

            <span className="text-sm">

                {value}

            </span>

        </div>

    );

}