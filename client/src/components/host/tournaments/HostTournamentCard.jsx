import RegistrationProgress from "./RegistrationProgress";
import StatusBadge from "./StatusBadge";

import {
    Calendar,
    Trophy,
    Users,
    ArrowRight,
    Swords,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HostTournamentCard({ tournament }) {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-violet-500/20
                bg-white/5
                backdrop-blur-2xl
                shadow-[0_0_35px_rgba(124,58,237,0.12)]
            "
        >
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-violet-600/10
                    via-transparent
                    to-fuchsia-600/10
                "
            />

            <div
                className="
                    absolute
                    -right-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-violet-600/15
                    blur-[120px]
                "
            />

            <div className="relative z-10 p-7">
                <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-5">
                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-violet-500
                                to-fuchsia-500
                                text-white
                            "
                        >
                            <Swords size={28} />
                        </div>

                        <div>
                            <h2 className="text-3xl font-black text-white">
                                {tournament.name}
                            </h2>

                            <p className="mt-3 max-w-2xl text-gray-400">
                                {tournament.description}
                            </p>
                        </div>
                    </div>

                    <StatusBadge status={tournament.status} />
                </div>

                <div className="mt-7">
                    <RegistrationProgress
                        registered={tournament.registrationCount}
                        maxTeams={tournament.maxTeams}
                    />
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <Info
                        icon={<Users size={18} />}
                        title="Teams"
                        value={`${tournament.maxTeams} Teams`}
                    />

                    <Info
                        icon={<Trophy size={18} />}
                        title="Prize Pool"
                        value={`₹${Number(
                            tournament.prizePool || 0
                        ).toLocaleString("en-IN")}`}
                    />

                    <Info
                        icon={<Calendar size={18} />}
                        title="Start Date"
                        value={new Date(
                            tournament.tournamentStart
                        ).toLocaleDateString("en-IN")}
                    />
                </div>

                <button
                    onClick={() =>
                        navigate(`/host/tournaments/${tournament._id}`)
                    }
                    className="
                        mt-8
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-violet-600
                        to-fuchsia-600
                        py-4
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-[1.01]
                        hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]
                    "
                >
                    Manage Tournament
                    <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    );
}

function Info({ icon, title, value }) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
            "
        >
            <div className="flex items-center gap-2 text-violet-300">
                {icon}
                <span className="text-xs font-medium uppercase tracking-wide">
                    {title}
                </span>
            </div>

            <div className="mt-3 text-base font-bold text-white">
                {value}
            </div>
        </div>
    );
}