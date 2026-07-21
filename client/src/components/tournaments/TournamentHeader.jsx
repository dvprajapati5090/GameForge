import {
    Trophy,
    Users,
    Calendar,
    Gamepad2
} from "lucide-react";

export default function TournamentHeader({

    tournament

}) {

    return (

        <div className="space-y-8">

            <img
                src={
                    tournament.banner ||
                    "https://placehold.co/1400x400/111827/ffffff?text=GameForge"
                }
                alt={tournament.name}
                className="
                    w-full
                    h-80
                    object-cover
                    rounded-3xl
                "
            />

            <div className="flex justify-between">

                <div>

                    <h1 className="text-5xl font-bold">

                        {tournament.name}

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Hosted by {tournament.organizer.displayName}

                    </p>

                </div>

                <span
                    className="
                        h-fit
                        px-4
                        py-2
                        rounded-full
                        bg-green-500/20
                        text-green-400
                    "
                >

                    {tournament.status}

                </span>

            </div>

            <div
                className="
                    grid
                    md:grid-cols-4
                    gap-6
                "
            >

                <InfoCard
                    icon={<Trophy />}
                    title="Prize Pool"
                    value={`₹ ${tournament.prizePool}`}
                />

                <InfoCard
                    icon={<Gamepad2 />}
                    title="Game"
                    value={tournament.game}
                />

                <InfoCard
                    icon={<Users />}
                    title="Teams"
                    value={`${tournament.registrationCount}/${tournament.maxTeams}`}
                />

                <InfoCard
                    icon={<Calendar />}
                    title="Starts"
                    value={new Date(
                        tournament.tournamentStart
                    ).toLocaleDateString()}
                />

            </div>

        </div>

    );

}

function InfoCard({

    icon,

    title,

    value

}) {

    return (

        <div
            className="
                bg-slate-900
                rounded-xl
                p-5
                border
                border-slate-800
            "
        >

            <div className="text-cyan-400">

                {icon}

            </div>

            <p className="text-gray-400 mt-3">

                {title}

            </p>

            <h3 className="font-bold text-xl mt-1">

                {value}

            </h3>

        </div>

    );

}