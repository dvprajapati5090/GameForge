import { motion } from "framer-motion";
import {
    Trophy,
    Users,
    PlayCircle,
    Calendar,
    TrendingUp,
} from "lucide-react";

const cards = [
    {
        title: "Total Tournaments",
        value: 0,
        icon: Trophy,
    },
    {
        title: "Live Events",
        value: 0,
        icon: PlayCircle,
    },
    {
        title: "Teams Registered",
        value: 0,
        icon: Users,
    },
    {
        title: "Upcoming Matches",
        value: 0,
        icon: Calendar,
    },
];

export default function HostStats() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                    }}
                    whileHover={{
                        y: -6,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-violet-500/20
                        bg-white/5
                        backdrop-blur-2xl
                        p-7
                        transition-all
                        duration-300
                        hover:border-violet-400/40
                        hover:shadow-[0_0_35px_rgba(124,58,237,0.22)]
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
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                        "
                    />

                    <div
                        className="
                            absolute
                            -right-10
                            -top-10
                            h-32
                            w-32
                            rounded-full
                            bg-violet-600/15
                            blur-3xl
                        "
                    />

                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-violet-500/25
                                    bg-violet-500/10
                                    transition-all
                                    duration-300
                                    group-hover:bg-violet-500/20
                                    group-hover:shadow-[0_0_25px_rgba(124,58,237,0.35)]
                                "
                            >
                                <card.icon
                                    size={28}
                                    className="text-violet-300"
                                />
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    rounded-full
                                    border
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                    px-3
                                    py-1.5
                                "
                            >
                                <TrendingUp
                                    size={14}
                                    className="text-emerald-400"
                                />

                                <span className="text-xs font-medium text-emerald-300">
                                    Active
                                </span>
                            </div>
                        </div>

                        <p
                            className="
                                mt-8
                                text-sm
                                font-medium
                                tracking-wide
                                text-gray-400
                            "
                        >
                            {card.title}
                        </p>

                        <h2
                            className="
                                mt-3
                                text-5xl
                                font-black
                                tracking-tight
                                text-white
                            "
                        >
                            {card.value}
                        </h2>

                        <div
    className="
        mt-6
        h-1.5
        w-full
        overflow-hidden
        rounded-full
        bg-white/5
    "
>
    {card.value > 0 && (
        <div
            style={{
                width: `${Math.min(card.value * 10, 100)}%`,
            }}
            className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-violet-500
                to-fuchsia-500
            "
        />
    )}
</div>
                    </div>

                    <div
                        className="
                            absolute
                            left-0
                            bottom-0
                            h-1
                            w-0
                            bg-gradient-to-r
                            from-violet-500
                            to-fuchsia-500
                            transition-all
                            duration-300
                            group-hover:w-full
                        "
                    />
                </motion.div>
            ))}
        </div>
    );
}