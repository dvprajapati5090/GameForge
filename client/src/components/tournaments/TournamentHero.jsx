import {
    Calendar,
    Trophy,
    Users,
    Gamepad2,
    Clock
} from "lucide-react";

import StatusBadge from "../host/tournaments/StatusBadge";
import TournamentCountdown from "./TournamentCountdown";

export default function TournamentHero({ tournament }) {

    const registered =
        tournament.registeredTeams?.length || 0;

    return (

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-white/10 p-10">

            {/* Background Glow */}

            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl"/>

            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"/>

            <div className="relative z-10">

                <div className="flex justify-between items-start">

                    <div>

                        <div className="flex gap-3 items-center mb-5">

                            <span className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">

                                {tournament.game}

                            </span>

                            <StatusBadge
                                status={tournament.status}
                            />

                        </div>

                        <h1 className="text-5xl font-black">

                            {tournament.name}

                        </h1>

                        <p className="mt-4 text-gray-400 max-w-3xl">

                            {tournament.description}

                        </p>

                    </div>

                    <div className="mt-8">

                        <TournamentCountdown

                            title={

                                tournament.status === "REGISTRATION_OPEN"

                                    ? "Registration Ends In"

                                    : "Tournament Starts In"

                            }

                            targetDate={

                                tournament.status === "REGISTRATION_OPEN"

                                    ? tournament.registrationEnd

                                    : tournament.tournamentStart

                            }

                        />

                    </div>

                    <div className="text-right">

                        <p className="text-gray-400">

                            Prize Pool

                        </p>

                        <h2 className="text-4xl font-black text-cyan-400">

                            ₹{tournament.prizePool}

                        </h2>

                    </div>

                </div>

                <div className="grid grid-cols-6 gap-6 mt-10">

                    <HeroCard
                        icon={<Users size={22}/>}
                        title="Teams"
                        value={`${registered}/${tournament.maxTeams}`}
                    />

                    <HeroCard
                        icon={<Gamepad2 size={22}/>}
                        title="Mode"
                        value={tournament.mode}
                    />

                    <HeroCard
                        icon={<Trophy size={22}/>}
                        title="Format"
                        value={tournament.format.replaceAll("_"," ")}
                    />

                    <HeroCard
                        icon={<Calendar size={22}/>}
                        title="Start Date"
                        value={
                            new Date(
                                tournament.tournamentStart
                            ).toLocaleString()
                        }
                    />

                    <HeroCard
                        icon={<Clock size={22}/>}
                        title="Registration Ends"
                        value={
                            new Date(
                                tournament.registrationEnd
                            ).toLocaleString()
                        }
                    />

                    <HeroCard
                        icon={<Users size={22}/>}
                        title="Organizer"
                        value={
                            tournament.organizer?.displayName ||
                            tournament.organizer?.username
                        }
                    />

                </div>

            </div>

        </div>

    );

}

function HeroCard({

    icon,

    title,

    value

}) {

    return (

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

            <div className="flex items-center gap-2 text-cyan-400">

                {icon}

                <span className="font-semibold">

                    {title}

                </span>

            </div>

            <h3 className="mt-4 text-xl font-bold">

                {value}

            </h3>

        </div>

    );

}