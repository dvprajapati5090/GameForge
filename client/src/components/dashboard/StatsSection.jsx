import StatCard from "./StatCard";

import {
    Trophy,
    Star,
    Users,
    Gamepad2
} from "lucide-react";

export default function StatsSection() {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <StatCard
                title="Current Rank"
                value="Bronze I"
                icon={<Trophy />}
                color="text-yellow-400"
            />

            <StatCard
                title="Account Level"
                value="69"
                icon={<Star />}
                color="text-cyan-400"
            />

            <StatCard
                title="Teams"
                value="4"
                icon={<Users />}
                color="text-purple-400"
            />

            <StatCard
                title="Matches"
                value="128"
                icon={<Gamepad2 />}
                color="text-green-400"
            />

        </div>

    );

}