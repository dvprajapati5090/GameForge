import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";

export default function ProfileAvatar({ player }) {
    const profile = player;

    const banner = profile?.riotCard
        ? `https://media.valorant-api.com/playercards/${profile.riotCard}/largeart.png`
        : null;

    return (
        <div
            className="
                relative
                h-[360px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-[#0B0F17]
                shadow-[0_18px_50px_rgba(0,0,0,0.45)]
            "
        >
            {/* Banner */}

            {banner ? (
                <motion.img
                    initial={{ scale: 1.03 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8 }}
                    src={banner}
                    alt="Player Card"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        object-top
                    "
                />
            ) : (
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-[#151926]
                        via-[#101522]
                        to-[#0B0F17]
                    "
                />
            )}

            {/* Dark Overlay */}

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-black/10
                    via-black/35
                    to-[#090B12]/95
                "
            />

            {/* Ambient Glow */}

            <div
                className="
                    absolute
                    -top-24
                    left-1/2
                    h-72
                    w-72
                    -translate-x-1/2
                    rounded-full
                    bg-violet-500/10
                    blur-[120px]
                "
            />

            {/* Soft Border */}

            <div
                className="
                    absolute
                    inset-0
                    rounded-[32px]
                    border
                    border-white/5
                "
            />

            {/* Avatar */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -4, 0],
                }}
                transition={{
                    duration: 0.5,
                    y: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                className="
                    absolute
                    left-1/2
                    bottom-8
                    z-30
                    -translate-x-1/2
                "
            >
                {/* Outer Glow */}

                <div
                    className="
                        absolute
                        inset-[-10px]
                        rounded-full
                        bg-violet-500/15
                        blur-2xl
                    "
                />

                {/* Decorative Ring */}

                <div
                    className="
                        absolute
                        inset-[-6px]
                        rounded-full
                        border
                        border-violet-400/15
                    "
                />

                {/* Avatar Frame */}

                <div
                    className="
                        relative
                        h-52
                        w-52
                        rounded-full
                        bg-gradient-to-br
                        from-violet-500
                        via-violet-600
                        to-indigo-600
                        p-[4px]
                    "
                >
                    <div
                        className="
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-full
                            border
                            border-white/10
                            bg-[#0B0F17]
                        "
                    >
                        {profile?.riotCard ? (
                            <motion.img
                                initial={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 6 }}
                                src={`https://media.valorant-api.com/playercards/${profile.riotCard}/displayicon.png`}
                                alt="Player Card"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    text-6xl
                                    font-black
                                    text-white
                                "
                            >
                                {profile?.displayName
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>
                        )}

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-transparent
                                via-transparent
                                to-black/25
                            "
                        />
                    </div>

                    {/* Online Indicator */}

                    <div
                        className="
                            absolute
                            bottom-4
                            right-4
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-[#0B0F17]
                            bg-emerald-400
                            shadow-[0_0_14px_rgba(74,222,128,0.6)]
                        "
                    >
                        <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                </div>
                                {/* Level Badge */}

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="
                        absolute
                        -bottom-5
                        left-1/2
                        -translate-x-1/2
                        rounded-full
                        border
                        border-white/10
                        bg-[#111827]/90
                        px-6
                        py-2
                        backdrop-blur-xl
                        shadow-lg
                    "
                >
                    <span
                        className="
                            text-sm
                            font-semibold
                            tracking-[0.22em]
                            text-violet-200
                        "
                    >
                        LEVEL {profile?.accountLevel ?? 1}
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}