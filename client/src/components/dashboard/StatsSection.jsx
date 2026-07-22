import StatCard from "./StatCard";

import {
    Trophy,
    Star,
    Users,
    Gamepad2
} from "lucide-react";

export default function StatsSection() {

    return (

        <section
            className="
                grid
                grid-cols-1
                gap-6

                md:grid-cols-2
                xl:grid-cols-4
            "
        >

            <StatCard
                title="Current Rank"
                value="Bronze I"
                icon={<Trophy />}
                color="text-amber-400"
            />

            <StatCard
                title="Account Level"
                value="69"
                icon={<Star />}
                color="text-violet-400"
            />

            <StatCard
                title="Teams"
                value="4"
                icon={<Users />}
                color="text-fuchsia-400"
            />

            <StatCard
                title="Matches"
                value="128"
                icon={<Gamepad2 />}
                color="text-emerald-400"
            />

        </section>

    );

}