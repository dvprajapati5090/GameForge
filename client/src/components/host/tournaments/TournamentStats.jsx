import {
    Users,
    Trophy,
    Activity
} from "lucide-react";

function Card({
    icon,
    title,
    value
}) {

    return (

        <div className="rounded-2xl bg-slate-900 p-6">

            <div className="text-cyan-400">
                {icon}
            </div>

            <p className="mt-4 text-gray-400">
                {title}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
                {value}
            </h2>

        </div>

    );

}

export default function TournamentStats({ tournament }) {

    return (

        <div className="grid md:grid-cols-4 gap-6">

            <Card
                icon={<Users size={22} />}
                title="Registered"
                value={tournament.registrationCount}
            />

            <Card
                icon={<Users size={22} />}
                title="Maximum Teams"
                value={tournament.maxTeams}
            />

            <Card
                icon={<Trophy size={22} />}
                title="Prize Pool"
                value={`₹${tournament.prizePool}`}
            />

            <Card
                icon={<Activity size={22} />}
                title="Status"
                value={tournament.status}
            />

        </div>

    );

}