import { motion } from "framer-motion";
import {
    Trophy,
    BarChart3,
    Star,
    Swords,
} from "lucide-react";

import GlowCard from "../ui/GlowCard";

const stats = (user) => [
    {
        icon: Trophy,
        title: "Current Rank",
        value: user?.currentRank || "UNRANKED",
        subtitle: "Competitive Tier",
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10",
    },

    {
        icon: BarChart3,
        title: "Rank Rating",
        value: `${user?.rankRating ?? 0} RR`,
        subtitle: "Current Season",
        iconColor: "text-violet-400",
        iconBg: "bg-violet-500/10",
    },

    {
        icon: Star,
        title: "Peak Rank",
        value: user?.highestRank || "N/A",
        subtitle: "Best Achievement",
        iconColor: "text-fuchsia-400",
        iconBg: "bg-fuchsia-500/10",
    },

    {
        icon: Swords,
        title: "Account Level",
        value: user?.accountLevel ?? 0,
        subtitle: "Overall Progress",
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10",
    },
];

export default function HeroStats({ player }) {
    const profile = player;

    return (
        <div
            className="
                mt-12
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
            "
        >
            {stats(profile).map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.title}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.45,
                            delay: index * 0.08,
                        }}
                        whileHover={{
                            y: -3,
                            scale: 1.015,
                        }}
                    >
                        <GlowCard
                            className="
                                group
                                relative
                                h-full
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#141A28]
                                backdrop-blur-xl
                                p-6
                                transition-all
                                duration-300
                                hover:border-violet-400/20
                            "
                        >
                            <div className="relative z-10">
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-white/10
                                            ${card.iconBg}
                                        `}
                                    >
                                        <Icon
                                            size={22}
                                            className={card.iconColor}
                                        />
                                    </div>
                                </div>

                                <p
                                    className="
                                        mt-7
                                        text-[11px]
                                        uppercase
                                        tracking-[0.28em]
                                        text-gray-500
                                    "
                                >
                                    {card.title}
                                </p>

                                <h3
                                    className="
                                        mt-3
                                        break-words
                                        text-3xl
                                        font-black
                                        text-white
                                    "
                                >
                                    {card.value}
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-gray-400
                                    "
                                >
                                    {card.subtitle}
                                </p>

                                <div
                                    className="
                                        mt-6
                                        h-px
                                        bg-white/10
                                    "
                                />
                                                                <div
                                    className="
                                        mt-5
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-[0.2em]
                                                text-gray-500
                                            "
                                        >
                                            Status
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                font-medium
                                                text-slate-300
                                            "
                                        >
                                            Updated
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <div
                                            className="
                                                h-2.5
                                                w-2.5
                                                rounded-full
                                                bg-violet-400
                                            "
                                        />

                                        <span
                                            className="
                                                text-xs
                                                font-medium
                                                text-violet-300
                                            "
                                        >
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    </motion.div>
                );
            })}
        </div>
    );
}