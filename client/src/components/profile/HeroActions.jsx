import { Pencil, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import EditProfileModal from "./EditProfileModal";

import useSyncRiot from "../../hooks/useSyncRiot";

import GradientButton from "../ui/GradientButton";

import useAuthStore from "../../store/authStore";

export default function HeroActions({ player }) {
    const [open, setOpen] = useState(false);

    const syncMutation = useSyncRiot();

    const user = useAuthStore((state) => state.user);

    const isOwnProfile =
        !player || player.username === user?.username;

    if (!isOwnProfile) {
        return null;
    }

    return (
        <>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.45,
                }}
                className="
                    mt-12
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-5
                "
            >
                {/* Edit Profile */}

                <GradientButton
                    onClick={() => setOpen(true)}
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        px-8
                        py-4
                        border
                        border-violet-500/20
                        shadow-[0_12px_35px_rgba(124,58,237,.30)]
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
                            gap-3
                            font-semibold
                        "
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-white/10
                                border
                                border-white/10
                            "
                        >
                            <Pencil size={18} />
                        </div>

                        <div className="text-left">
                            <p className="font-semibold">
                                Edit Profile
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-white/70
                                "
                            >
                                Update your information
                            </p>
                        </div>
                    </span>
                </GradientButton>

                {/* Sync Riot */}

                <motion.button
                    whileHover={{
                        y: -3,
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    onClick={() => syncMutation.mutate()}
                    disabled={syncMutation.isPending}
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-white/[0.04]
                        backdrop-blur-xl
                        px-8
                        py-4
                        transition-all
                        duration-300
                        shadow-[0_10px_35px_rgba(76,29,149,.20)]
                        hover:border-violet-400/40
                        disabled:opacity-60
                    "
                >
                    {/* Glow */}

                    <div
                        className="
                            absolute
                            -right-10
                            -top-10
                            h-24
                            w-24
                            rounded-full
                            bg-violet-600/15
                            blur-3xl
                        "
                    />

                    {/* Shine */}

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-transparent
                            via-white/10
                            to-transparent
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
                            gap-4
                        "
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-violet-600
                                to-fuchsia-600
                                shadow-[0_0_20px_rgba(139,92,246,.35)]
                            "
                        >
                            <RefreshCw
                                size={18}
                                className={
                                    syncMutation.isPending
                                        ? "animate-spin text-white"
                                        : "text-white"
                                }
                            />
                        </div>

                        <div className="text-left">
                            <p
                                className="
                                    font-semibold
                                    text-white
                                "
                            >
                                {syncMutation.isPending
                                    ? "Syncing Riot..."
                                    : "Sync Riot"}
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-gray-400
                                "
                            >
                                Update latest rank & stats
                            </p>
                        </div>

                        {!syncMutation.isPending && (
                            <Sparkles
                                size={18}
                                className="
                                    ml-2
                                    text-violet-400
                                    transition-transform
                                    duration-300
                                    group-hover:rotate-180
                                "
                            />
                        )}
                    </span>
                </motion.button>
            </motion.div>

            <EditProfileModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}