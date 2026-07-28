import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";

import ProfileAvatar from "./ProfileAvatar";
import HeroInfo from "./HeroInfo";
import HeroStats from "./HeroStats";
import HeroActions from "./HeroActions";

export default function PlayerHero({ player }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative"
        >
            {/* Decorative background glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                <div
                    className="
                        absolute
                        -top-28
                        -left-24
                        h-72
                        w-72
                        rounded-full
                        bg-violet-600/15
                        blur-[110px]
                    "
                />

                <div
                    className="
                        absolute
                        top-24
                        -right-24
                        h-72
                        w-72
                        rounded-full
                        bg-fuchsia-600/10
                        blur-[120px]
                    "
                />

                <div
                    className="
                        absolute
                        bottom-0
                        left-1/2
                        h-56
                        w-56
                        -translate-x-1/2
                        rounded-full
                        bg-violet-500/10
                        blur-[100px]
                    "
                />
            </div>

            <ProfileAvatar player={player} />

            <GlassCard
                className="
                    relative
                    mt-10
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-xl
                    px-8
                    py-10
                    md:px-12
                    md:py-12
                    shadow-[0_20px_80px_rgba(76,29,149,0.28)]
                "
            >
                {/* Premium Border Glow */}
                <div
                    className="
                        absolute
                        inset-0
                        rounded-[28px]
                        border
                        border-violet-500/15
                    "
                />

                {/* Top Accent */}
                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-violet-400/70
                        to-transparent
                    "
                />

                {/* Bottom Accent */}
                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-fuchsia-500/60
                        to-transparent
                    "
                />

                {/* Corner Glow */}
                <div
                    className="
                        absolute
                        top-0
                        right-0
                        h-44
                        w-44
                        rounded-full
                        bg-violet-500/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        h-44
                        w-44
                        rounded-full
                        bg-purple-500/10
                        blur-3xl
                    "
                />

                <div className="relative z-10 space-y-10">
                    <HeroInfo player={player} />

                    <HeroStats player={player} />

                    <HeroActions player={player} />
                </div>
            </GlassCard>
        </motion.div>
    );
}