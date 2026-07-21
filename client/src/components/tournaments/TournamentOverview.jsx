import {
    Calendar,
    Trophy,
    Gamepad2,
    Users
} from "lucide-react";

export default function TournamentOverview({

    tournament

}) {

    const Item = ({

        icon,

        title,

        value

    }) => (

        <div className="flex gap-4 items-start">

            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">

                {icon}

            </div>

            <div>

                <p className="text-sm text-gray-400">

                    {title}

                </p>

                <h3 className="font-bold text-lg">

                    {value}

                </h3>

            </div>

        </div>

    );

    return (

        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-slate-900
                p-8
            "
        >

            <h2 className="text-2xl font-black mb-8">

                Tournament Overview

            </h2>

            <div className="grid md:grid-cols-2 gap-8">

                <Item

                    icon={<Gamepad2 size={22}/>}

                    title="Game"

                    value={tournament.game}

                />

                <Item

                    icon={<Users size={22}/>}

                    title="Mode"

                    value={tournament.mode}

                />

                <Item

                    icon={<Trophy size={22}/>}

                    title="Prize Pool"

                    value={`₹${tournament.prizePool}`}

                />

                <Item

                    icon={<Calendar size={22}/>}

                    title="Tournament Starts"

                    value={new Date(
                        tournament.tournamentStart
                    ).toLocaleString()}

                />

            </div>

        </div>

    );

}