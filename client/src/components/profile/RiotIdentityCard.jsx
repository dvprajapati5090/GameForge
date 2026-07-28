import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck } from "lucide-react";

export default function RiotIdentityCard({ player }) {
    if (!player?.riotGameName) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -3 }}
            className="
                relative
                mt-8
                mx-auto
                max-w-xl
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                backdrop-blur-xl
                shadow-[0_12px_40px_rgba(76,29,149,0.25)]
            "
        >
            {/* Background Glow */}

            <div
                className="
                    absolute
                    -top-16
                    -right-16
                    h-40
                    w-40
                    rounded-full
                    bg-violet-600/15
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -bottom-20
                    -left-12
                    h-36
                    w-36
                    rounded-full
                    bg-fuchsia-500/10
                    blur-3xl
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
                    via-violet-400
                    to-transparent
                "
            />

            <div className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-[0.35em]
                                text-violet-300
                            "
                        >
                            Riot Identity
                        </p>

                        <h3
                            className="
                                mt-2
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            Connected Account
                        </h3>
                    </div>

                    {player.riotVerified && (
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-emerald-500/20
                                bg-emerald-500/10
                                px-4
                                py-2
                            "
                        >
                            <BadgeCheck
                                size={16}
                                className="text-emerald-400"
                            />

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-emerald-300
                                "
                            >
                                Verified
                            </span>
                        </div>
                    )}
                </div>

                <div
                    className="
                        mt-6
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        p-5
                    "
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-violet-600
                                to-fuchsia-600
                                shadow-[0_0_25px_rgba(139,92,246,0.35)]
                            "
                        >
                            <ShieldCheck
                                size={24}
                                className="text-white"
                            />
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.25em]
                                    text-gray-400
                                "
                            >
                                Riot ID
                            </p>

                            <div
                                className="
                                    mt-1
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        truncate
                                        text-2xl
                                        font-black
                                        text-white
                                    "
                                >
                                    {player.riotGameName}
                                </span>

                                <span
                                    className="
                                        text-2xl
                                        font-black
                                        text-violet-400
                                    "
                                >
                                    #{player.riotTagLine}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}