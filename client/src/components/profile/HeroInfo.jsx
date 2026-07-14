import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";

import RiotIdentityCard from "./RiotIdentityCard";

export default function HeroInfo() {

    const user = useAuthStore((state) => state.user);

    const getRankColor = () => {

        if (!user?.currentRank)
            return "from-slate-600 to-slate-700";

        if (user.currentRank.includes("IRON"))
            return "from-gray-600 to-gray-400";

        if (user.currentRank.includes("BRONZE"))
            return "from-amber-700 to-amber-500";

        if (user.currentRank.includes("SILVER"))
            return "from-gray-300 to-slate-100";

        if (user.currentRank.includes("GOLD"))
            return "from-yellow-500 to-yellow-300";

        if (user.currentRank.includes("PLATINUM"))
            return "from-cyan-500 to-blue-500";

        if (user.currentRank.includes("DIAMOND"))
            return "from-indigo-500 to-purple-500";

        if (user.currentRank.includes("ASCENDANT"))
            return "from-green-500 to-emerald-400";

        if (user.currentRank.includes("IMMORTAL"))
            return "from-pink-600 to-red-500";

        if (user.currentRank.includes("RADIANT"))
            return "from-red-500 to-yellow-400";

        return "from-cyan-500 to-purple-600";
    };

    return (

        <div className="text-center">

            <div className="space-y-1">

                <p
                    className="
                        uppercase
                        tracking-[8px]
                        text-cyan-400
                        text-sm
                        font-semibold
                    "
                >
                    GAMEFORGE PLAYER
                </p>

                <h1
                    className="
                        text-6xl
                        font-black
                        bg-gradient-to-r
                        from-white
                        via-cyan-200
                        to-purple-300
                        bg-clip-text
                        text-transparent
                    "
                >

                    {user?.displayName}

                </h1>

            </div>

            <RiotIdentityCard />

            <div className="flex justify-center gap-5 flex-wrap mt-5">

                <motion.div
                    whileHover={{
                        scale: 1.05,
                        rotate: -1
                    }}
                    className={`
                        relative
                        overflow-hidden
                        px-7
                        py-3
                        rounded-full
                        font-bold
                        bg-gradient-to-r
                        ${getRankColor()}
                        shadow-lg
                    `}
                >

                    <div
                        className="
                            absolute
                            inset-0
                            bg-white/10
                            opacity-0
                            hover:opacity-100
                            transition
                        "
                    />

                    <span className="relative z-10 flex items-center gap-2">

                        🏆

                        {user?.currentRank || "UNRANKED"}

                    </span>

                </motion.div>

                <div
                    className="
                        px-8
                        py-3
                        rounded-full
                        border
                        border-cyan-500/30
                        bg-cyan-500/10
                        text-cyan-300
                        font-bold
                        text-lg
                    "
                >

                    ⚡ {user?.rankRating ?? 0} RR

                </div>

            </div>

        </div>

    );

}