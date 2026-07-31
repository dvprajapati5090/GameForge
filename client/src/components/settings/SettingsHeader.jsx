import { Settings, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-[#15182f]/95
                via-[#11152b]/95
                to-[#0d1224]/95
                backdrop-blur-xl
                px-8
                py-8
                shadow-[0_0_60px_rgba(139,92,246,0.12)]
            "
        >
            {/* Glow */}
            <div
                className="
                    absolute
                    -top-24
                    right-0
                    h-56
                    w-56
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                    pointer-events-none
                "
            />

            <div
                className="
                    absolute
                    -bottom-24
                    left-0
                    h-56
                    w-56
                    rounded-full
                    bg-purple-600/10
                    blur-3xl
                    pointer-events-none
                "
            />

            <div className="relative flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-5">
                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-cyan-400/20
                                bg-gradient-to-br
                                from-cyan-500/20
                                to-purple-600/20
                                shadow-[0_0_25px_rgba(34,211,238,0.18)]
                            "
                        >
                            <Settings
                                size={32}
                                className="text-cyan-300"
                            />
                        </div>

                        <div>
                            <h1
                                className="
                                    text-5xl
                                    font-black
                                    tracking-tight
                                    bg-gradient-to-r
                                    from-white
                                    via-purple-200
                                    to-cyan-300
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                Settings
                            </h1>

                            <p className="mt-2 text-gray-400 text-lg">
                                Manage your GameForge account and preferences.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="
                        hidden
                        lg:flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-emerald-400/20
                        bg-emerald-500/10
                        px-5
                        py-2
                    "
                >
                    <Sparkles
                        size={16}
                        className="text-emerald-400"
                    />

                    <span className="text-sm font-semibold text-emerald-300">
                        Account Active
                    </span>
                </div>
            </div>
        </motion.div>
    );
}