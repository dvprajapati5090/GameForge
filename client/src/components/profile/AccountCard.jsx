import { motion } from "framer-motion";

import GlowCard from "../ui/GlowCard";

import {
    ShieldCheck,
    Gamepad2,
    Trophy,
    Star,
    RefreshCw,
    ChevronRight,
    Sparkles,
    Shield,
} from "lucide-react";

import useAuthStore from "../../store/authStore";

import useSyncRiot from "../../hooks/useSyncRiot";

export default function AccountCard({ player }) {
    const syncMutation = useSyncRiot();

    const loggedInUser = useAuthStore((state) => state.user);

    const isOwnProfile =
        loggedInUser?.username === player?.username;

    return (
        <GlowCard
            className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-[#0d1220]
                p-8
                shadow-[0_18px_70px_rgba(76,29,149,0.30)]
            "
        >
            {/* Background Glow */}

            <div
                className="
                    absolute
                    -top-24
                    -right-20
                    h-72
                    w-72
                    rounded-full
                    bg-violet-600/15
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    -bottom-24
                    -left-16
                    h-72
                    w-72
                    rounded-full
                    bg-fuchsia-600/10
                    blur-[120px]
                "
            />

            {/* Decorative Border */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[30px]
                    border
                    border-violet-500/10
                "
            />

            {/* Top Accent */}

            <div
                className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-violet-400/80
                    to-transparent
                "
            />

            <div className="relative z-10">
                {/* Header */}

                <div className="flex items-start justify-between">
                    <div>
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
                            "
                        >
                            <Sparkles
                                size={15}
                                className="text-violet-300"
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.35em]
                                    text-violet-300
                                "
                            >
                                Connected
                            </span>
                        </div>

                        <h2
                            className="
                                mt-5
                                text-3xl
                                font-black
                                tracking-tight
                                text-white
                            "
                        >
                            Riot Account
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Competitive profile linked with GameForge.
                        </p>
                    </div>

                    <div
                        className="
                            hidden
                            md:flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-violet-600
                            to-fuchsia-600
                            shadow-[0_0_35px_rgba(139,92,246,0.35)]
                        "
                    >
                        <Shield
                            size={30}
                            className="text-white"
                        />
                    </div>
                </div>

                {player?.riotVerified ? (
                    <>
                        {/* Verified */}

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="
                                mt-8
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-emerald-500/20
                                bg-emerald-500/10
                                px-5
                                py-4
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-500/15
                                    "
                                >
                                    <ShieldCheck
                                        size={22}
                                        className="text-emerald-400"
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold text-emerald-300">
                                        Verified Riot Account
                                    </p>

                                    <p className="text-sm text-emerald-200/70">
                                        Tournament ready
                                    </p>
                                </div>
                            </div>

                            <ChevronRight
                                className="text-emerald-400"
                                size={18}
                            />
                        </motion.div>

                        {/* Riot ID */}

                        <div
                            className="
                                mt-8
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                p-6
                                backdrop-blur-xl
                            "
                        >
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.35em]
                                    text-violet-300
                                "
                            >
                                Riot ID
                            </p>

                            <div
                                className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        text-4xl
                                        font-black
                                        text-white
                                    "
                                >
                                    {player.riotGameName}
                                </span>

                                <span
                                    className="
                                        text-4xl
                                        font-black
                                        text-violet-400
                                    "
                                >
                                    #{player.riotTagLine}
                                </span>
                            </div>
                        </div>

                        {/* Stats Grid */}

                        <div className="mt-8 grid grid-cols-2 gap-5">
                            <MiniCard
                                icon={
                                    <Trophy className="text-yellow-400" />
                                }
                                label="Current Rank"
                                value={player.currentRank || "UNRANKED"}
                            />

                            <MiniCard
                                icon={
                                    <Star className="text-violet-400" />
                                }
                                label="Peak Rank"
                                value={player.highestRank || "N/A"}
                            />

                            <MiniCard
                                icon={
                                    <Gamepad2 className="text-fuchsia-400" />
                                }
                                label="Level"
                                value={player.accountLevel}
                            />

                            <MiniCard
                                icon={
                                    <RefreshCw className="text-emerald-400" />
                                }
                                label="RR"
                                value={player.rankRating}
                            />
                        </div>
                                                {isOwnProfile && (
                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                onClick={() => syncMutation.mutate()}
                                className="
                                    group
                                    relative
                                    mt-8
                                    w-full
                                    overflow-hidden
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    via-purple-600
                                    to-fuchsia-600
                                    px-6
                                    py-4
                                    font-bold
                                    text-white
                                    shadow-[0_12px_35px_rgba(124,58,237,0.35)]
                                    transition-all
                                "
                            >
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-r
                                        from-white/0
                                        via-white/15
                                        to-white/0
                                        -translate-x-full
                                        group-hover:translate-x-full
                                        transition-transform
                                        duration-1000
                                    "
                                />

                                <span
                                    className="
                                        relative
                                        flex
                                        items-center
                                        justify-center
                                        gap-3
                                    "
                                >
                                    <RefreshCw
                                        size={18}
                                        className={
                                            syncMutation.isPending
                                                ? "animate-spin"
                                                : ""
                                        }
                                    />

                                    {syncMutation.isPending
                                        ? "Syncing Riot Profile..."
                                        : "Sync Riot Profile"}
                                </span>
                            </motion.button>
                        )}
                    </>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="
                                mt-8
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                p-8
                                text-center
                            "
                        >
                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-20
                                    w-20
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-violet-600
                                    to-fuchsia-600
                                    shadow-[0_0_30px_rgba(139,92,246,0.35)]
                                "
                            >
                                <Shield
                                    size={34}
                                    className="text-white"
                                />
                            </div>

                            <h3
                                className="
                                    mt-6
                                    text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Riot Account Not Connected
                            </h3>

                            <p
                                className="
                                    mx-auto
                                    mt-3
                                    max-w-sm
                                    leading-7
                                    text-gray-400
                                "
                            >
                                Connect your Riot account to unlock
                                competitive statistics, live rank,
                                tournament verification and automatic
                                profile syncing.
                            </p>

                            <button
                                className="
                                    mt-8
                                    w-full
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    via-purple-600
                                    to-fuchsia-600
                                    py-4
                                    font-semibold
                                    text-white
                                    shadow-[0_12px_35px_rgba(124,58,237,0.35)]
                                    transition-all
                                    hover:scale-[1.02]
                                "
                            >
                                Connect Riot Account
                            </button>
                        </motion.div>
                    </>
                )}
            </div>
        </GlowCard>
    );
}

function MiniCard({
    icon,
    label,
    value,
}) {
    return (
        <motion.div
            whileHover={{
                y: -4,
                scale: 1.02,
            }}
            transition={{
                type: "spring",
                stiffness: 260,
            }}
        >
            <GlowCard
                className="
                    relative
                    h-full
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-5
                "
            >
                <div
                    className="
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-violet-600/10
                        blur-2xl
                    "
                />

                <div
                    className="
                        relative
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.05]
                    "
                >
                    {icon}
                </div>

                <p
                    className="
                        mt-5
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        text-gray-400
                    "
                >
                    {label}
                </p>

                <h3
                    className="
                        mt-2
                        break-words
                        text-xl
                        font-bold
                        text-white
                    "
                >
                    {value ?? "-"}
                </h3>
            </GlowCard>
        </motion.div>
    );
}