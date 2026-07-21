import {
    Users,
    Trophy,
    Calendar,
    Clock
} from "lucide-react";

export default function TournamentStats({ tournament }) {

    return (

        <div className="grid md:grid-cols-4 gap-5">

            <StatCard
                icon={<Users />}
                title="Teams"
                value={`${tournament.registrationCount}/${tournament.maxTeams}`}
            />

            <StatCard
                icon={<Calendar />}
                title="Status"
                value={tournament.status.replaceAll("_"," ")}
            />

            <StatCard
                icon={<Clock />}
                title="Starts"
                value={new Date(
                    tournament.tournamentStart
                ).toLocaleDateString()}
            />

            <StatCard
                icon={<Trophy />}
                title="Prize Pool"
                value={`₹${tournament.prizePool}`}
            />

        </div>

    );

}

function StatCard({
    icon,
    title,
    value
}) {

    return (

        <div className="rounded-2xl bg-slate-900 p-6">

            <div className="text-cyan-400">

                {icon}

            </div>

            <p className="text-gray-400 mt-4">

                {title}

            </p>

            <h2 className="text-2xl font-bold mt-2">

                {value}

            </h2>

        </div>

    );

}