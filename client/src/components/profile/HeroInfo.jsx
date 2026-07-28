import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import useAuthStore from "../../store/authStore";
import RiotIdentityCard from "./RiotIdentityCard";

export default function HeroInfo({ player }) {
    const profile = player;

    const getRankColor = () => {
        if (!profile?.currentRank)
            return "from-slate-700 via-slate-600 to-slate-700";

        if (profile.currentRank.includes("IRON"))
            return "from-gray-700 to-gray-500";

        if (profile.currentRank.includes("BRONZE"))
            return "from-amber-700 to-orange-500";

        if (profile.currentRank.includes("SILVER"))
            return "from-gray-300 to-slate-100";

        if (profile.currentRank.includes("GOLD"))
            return "from-yellow-500 to-amber-300";

        if (profile.currentRank.includes("PLATINUM"))
            return "from-cyan-500 to-sky-500";

        if (profile.currentRank.includes("DIAMOND"))
            return "from-indigo-500 to-violet-500";

        if (profile.currentRank.includes("ASCENDANT"))
            return "from-emerald-500 to-green-400";

        if (profile.currentRank.includes("IMMORTAL"))
            return "from-pink-600 to-rose-500";

        if (profile.currentRank.includes("RADIANT"))
            return "from-red-500 to-yellow-400";

        return "from-violet-500 to-fuchsia-500";
    };

    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-5"
            >
                <div className="flex justify-center">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            px-5
                            py-2
                            backdrop-blur-xl
                            transition-colors
                            hover:border-violet-500/20
                        "
                    >
                        <Sparkles
                            size={14}
                            className="text-violet-400"
                        />

                        <span
                            className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.35em]
                                text-slate-300
                            "
                        >
                            GameForge Player
                        </span>
                    </motion.div>
                </div>

                <h1
                    className="
                        text-5xl
                        font-black
                        tracking-tight
                        text-white
                        md:text-6xl
                    "
                >
                    {profile?.displayName}
                </h1>

                <p
                    className="
                        text-sm
                        tracking-[0.35em]
                        uppercase
                        text-slate-400
                    "
                >
                    Valorant Profile
                </p>
            </motion.div>

            <div className="mt-8">
                <RiotIdentityCard player={profile} />
            </div>

            <div
                className="
                    mt-8
                    flex
                    flex-wrap
                    justify-center
                    gap-4
                "
            >
                <motion.div
                    whileHover={{
                        y: -2,
                        scale: 1.02,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className={`
                        relative
                        overflow-hidden
                        rounded-full
                        bg-gradient-to-r
                        ${getRankColor()}
                        px-7
                        py-3
                        shadow-lg
                    `}
                >
                    <div
                        className="
                            relative
                            flex
                            items-center
                            gap-3
                            font-semibold
                            tracking-wide
                            text-white
                        "
                    >
                        <span className="text-lg">
                            🏆
                        </span>

                        <span>
                            {profile?.currentRank || "UNRANKED"}
                        </span>
                    </div>
                </motion.div>
                                <motion.div
                    whileHover={{
                        y: -2,
                        scale: 1.02,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="
                        relative
                        overflow-hidden
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-7
                        py-3
                        backdrop-blur-xl
                        shadow-lg
                    "
                >
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-violet-500/5
                            via-transparent
                            to-violet-500/5
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            items-center
                            gap-3
                            font-semibold
                            text-slate-200
                        "
                    >
                        <CheckCircle2
                            size={18}
                            className="text-violet-400"
                        />

                        <span className="tracking-wide">
                            {profile?.rankRating ?? 0} RR
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}