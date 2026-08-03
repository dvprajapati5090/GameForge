import StatCard from "./StatCard";
import { Trophy, Star, Users, Gamepad2 } from "lucide-react";

export default function StatsSection() {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Current Rank" value="Bronze I" icon={<Trophy />} index={0} />
            <StatCard title="Account Level" value="69"       icon={<Star />}    index={1} />
            <StatCard title="Teams"         value="4"        icon={<Users />}   index={2} />
            <StatCard title="Matches"       value="128"      icon={<Gamepad2 />} index={3} />
        </section>
    );
}