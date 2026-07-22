import { motion } from "framer-motion";
import {
    ArrowRight,
    Trophy,
    Users,
    Shield,
    Sparkles
} from "lucide-react";

import Button from "../ui/Button";

export default function HeroBanner() {
    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.7
            }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-violet-500/20
                bg-gradient-to-br
                from-[#0B1020]
                via-[#111827]
                to-[#24113A]
                shadow-[0_0_60px_rgba(139,92,246,0.15)]
            "
        >

            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[120px]" />
                <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[140px]" />
            </div>

            {/* Grid Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.05]
                    [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                    [background-size:40px_40px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-12
                    p-8
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    lg:p-12
                "
            >

                {/* Left Content */}
                <div className="max-w-3xl">

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-violet-300
                            backdrop-blur-xl
                        "
                    >
                        <Sparkles size={16} />
                        Premium Esports Platform
                    </div>

                    <h1
                        className="
                            mt-6
                            text-5xl
                            font-black
                            leading-tight
                            text-white
                            lg:text-6xl
                        "
                    >
                        Welcome back to{" "}
                        <span
                            className="
                                bg-gradient-to-r
                                from-violet-300
                                via-fuchsia-300
                                to-indigo-300
                                bg-clip-text
                                text-transparent
                            "
                        >
                            GameForge
                        </span>
                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-lg
                            leading-8
                            text-slate-300
                        "
                    >
                        Forge your competitive legacy with elite tournaments,
                        powerful teams and an immersive esports ecosystem built
                        for champions.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Button>
                            <div className="flex items-center gap-2">
                                Join Tournament
                                <ArrowRight size={18} />
                            </div>
                        </Button>

                        <button
                            className="
                                rounded-xl
                                border
                                border-violet-500/20
                                bg-white/5
                                px-7
                                py-3
                                font-medium
                                text-slate-200
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-violet-400/40
                                hover:bg-violet-500/10
                            "
                        >
                            Explore Teams
                        </button>

                    </div>
                </div>

                {/* Right Stats */}
                <div
                    className="
                        grid
                        w-full
                        max-w-md
                        gap-5
                    "
                >

                    <MiniCard
                        icon={
                            <Trophy
                                size={26}
                                className="text-yellow-400"
                            />
                        }
                        value="120+"
                        label="Active Tournaments"
                    />

                    <MiniCard
                        icon={
                            <Users
                                size={26}
                                className="text-violet-300"
                            />
                        }
                        value="8.5K"
                        label="Registered Players"
                    />
                                        <MiniCard
                        icon={
                            <Shield
                                size={26}
                                className="text-fuchsia-300"
                            />
                        }
                        value="410"
                        label="Competitive Teams"
                    />

                </div>

            </div>

        </motion.section>
    );
}

function MiniCard({
    icon,
    value,
    label
}) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02
            }}
            transition={{
                duration: 0.25
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-violet-500/20
                bg-white/5
                p-5
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:border-violet-400/40
                hover:bg-white/10
                hover:shadow-[0_0_35px_rgba(139,92,246,0.20)]
            "
        >

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-violet-500/10
                    via-transparent
                    to-fuchsia-500/10
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                "
            />

            <div className="relative z-10 flex items-start justify-between">

                <div>

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/10
                            backdrop-blur-xl
                        "
                    >
                        {icon}
                    </div>

                    <h2
                        className="
                            mt-5
                            text-3xl
                            font-extrabold
                            text-white
                        "
                    >
                        {value}
                    </h2>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-400
                        "
                    >
                        {label}
                    </p>

                </div>

                <div
                    className="
                        rounded-full
                        border
                        border-emerald-400/20
                        bg-emerald-500/10
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-emerald-300
                    "
                >
                    Live
                </div>

            </div>

        </motion.div>
    );
}