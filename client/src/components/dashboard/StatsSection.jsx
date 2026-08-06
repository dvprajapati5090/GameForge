import StatCard from "./StatCard";
import { Trophy, Star, Users, Gamepad2 } from "lucide-react";
import useAuthStore from "../../store/authStore";

export default function StatsSection() {
    const user = useAuthStore((s) => s.user);

    const currentRank = user?.currentRank || "UNRANKED";
    const accountLevel = user?.accountLevel ?? 0;
    const inTeam = user?.team ? 1 : 0;
    const matchesPlayed = user?.stats?.matchesPlayed ?? 0;

    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Current Rank"  value={currentRank}   icon={<Trophy />}   index={0} />
            <StatCard title="Account Level" value={accountLevel}  icon={<Star />}     index={1} />
            <StatCard title="Teams"         value={inTeam}        icon={<Users />}    index={2} />
            <StatCard title="Matches"       value={matchesPlayed} icon={<Gamepad2 />} index={3} />
        </section>
    );
}