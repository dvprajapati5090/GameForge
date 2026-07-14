import { motion } from "framer-motion";
import {
    ArrowRight,
    Trophy,
    Users,
    Shield
} from "lucide-react";

export default function HeroBanner() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.8
            }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-slate-900
                via-[#16213E]
                to-[#3B0764]
                p-10
            "
        >

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full" />

            <div className="relative z-10">

                <p className="uppercase tracking-[8px] text-cyan-400 text-sm font-semibold">
                    Esports Platform
                </p>

                <h1 className="mt-4 text-6xl font-black leading-tight">
                    GAME
                    <span className="text-cyan-300">
                        FORGE
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-8">
                    Forge your competitive legacy.
                    Join tournaments, build elite teams,
                    compete with players worldwide and
                    dominate the leaderboard.
                </p>

                <div className="flex gap-5 mt-8">

                    <button
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-7
                            py-4
                            font-semibold
                            bg-gradient-to-r
                            from-cyan-500
                            to-purple-600
                            hover:scale-105
                            transition
                        "
                    >
                        Join Tournament

                        <ArrowRight size={18} />
                    </button>

                    <button
                        className="
                            rounded-xl
                            border
                            border-white/10
                            px-7
                            py-4
                            hover:bg-white/5
                            transition
                        "
                    >
                        Explore Teams
                    </button>

                </div>

                <div className="grid grid-cols-3 gap-5 mt-12">

                    <MiniCard
                        icon={<Trophy className="text-yellow-400" />}
                        value="120+"
                        label="Tournaments"
                    />

                    <MiniCard
                        icon={<Users className="text-cyan-400" />}
                        value="8.5K"
                        label="Players"
                    />

                    <MiniCard
                        icon={<Shield className="text-purple-400" />}
                        value="410"
                        label="Teams"
                    />

                </div>

            </div>

        </motion.div>
    );
}

function MiniCard({
    icon,
    value,
    label
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
            "
        >

            <div className="text-2xl">
                {icon}
            </div>

            <h2 className="text-4xl font-bold mt-4">
                {value}
            </h2>

            <p className="text-gray-400 mt-2">
                {label}
            </p>

        </div>
    );
}