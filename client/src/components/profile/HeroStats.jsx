import {
    Trophy,
    BarChart3,
    Star,
    Swords
} from "lucide-react";

import useAuthStore from "../../store/authStore";

import GlowCard from "../ui/GlowCard";

const stats = (user) => [

    {
        icon: Trophy,
        title: "Current Rank",
        value: user?.currentRank || "UNRANKED",
        subtitle: "Competitive Tier",
        color: "from-orange-500 to-yellow-500",
        glow: "shadow-orange-500/20"
    },

    {
        icon: BarChart3,
        title: "Rank Rating",
        value: `${user?.rankRating ?? 0} RR`,
        subtitle: "Current Season",
        color: "from-cyan-500 to-blue-500",
        glow: "shadow-cyan-500/20"
    },

    {
        icon: Star,
        title: "Peak Rank",
        value: user?.highestRank || "N/A",
        subtitle: "Best Achievement",
        color: "from-purple-500 to-pink-500",
        glow: "shadow-purple-500/20"
    },

    {
        icon: Swords,
        title: "Account Level",
        value: user?.accountLevel ?? 0,
        subtitle: "Overall Progress",
        color: "from-emerald-500 to-green-500",
        glow: "shadow-emerald-500/20"
    }

];

export default function HeroStats({player}) {

    const user = useAuthStore((state) => state.user);

    const profile = player || user;

    return (

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-14">

            {

                stats(profile).map((card) => {

                    const Icon = card.icon;

                    return (

                        <GlowCard

                            key={card.title}

                            className="
                                relative
                                overflow-hidden
                                p-6
                            "

                        >

                            <div

                                className={`
                                    absolute
                                    top-0
                                    left-0
                                    h-1
                                    w-full
                                    bg-gradient-to-r
                                    ${card.color}
                                `}

                            />

                            <div

                                className={`
                                    inline-flex
                                    rounded-2xl
                                    p-3
                                    bg-gradient-to-r
                                    ${card.color}
                                    ${card.glow}
                                    shadow-lg
                                `}

                            >

                                <Icon
                                    size={22}
                                    className="text-white"
                                />

                            </div>

                            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gray-400">

                                {card.title}

                            </p>

                            <h3 className="mt-2 text-3xl font-black">

                                {card.value}

                            </h3>

                            <p className="mt-2 text-gray-500 text-sm">

                                {card.subtitle}

                            </p>

                            <div

                                className="
                                    mt-6
                                    h-px
                                    bg-gradient-to-r
                                    from-transparent
                                    via-white/20
                                    to-transparent
                                "
                            />

                        </GlowCard>

                    );

                })

            }

        </div>

    );

}