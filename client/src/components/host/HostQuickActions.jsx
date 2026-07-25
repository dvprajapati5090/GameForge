import { motion } from "framer-motion";
import {
    PlusCircle,
    ListChecks,
    GitBranch,
    Users,
    Zap,
    ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
    {
        title: "Create Tournament",
        icon: PlusCircle,
        path: "/host/create-tournament",
    },
    {
        title: "My Tournaments",
        icon: ListChecks,
        path: "/host/tournaments",
    },
    {
        title: "Generate Brackets",
        icon: GitBranch,
        path: "/host/tournaments",
    },
    {
        title: "Registered Teams",
        icon: Users,
        path: "/host/tournaments",
    },
];

export default function HostQuickActions() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-violet-500/20
                bg-white/5
                backdrop-blur-2xl
                p-6
                shadow-[0_0_40px_rgba(124,58,237,0.12)]
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
                "
            />

            <div className="relative z-10">
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
                        text-xs
                        font-semibold
                        text-violet-300
                    "
                >
                    <Zap size={14} />
                    Quick Access
                </div>

                <h2 className="mt-4 text-2xl font-black text-white">
                    Quick Actions
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                    Jump to your most-used host tools.
                </p>

                <div className="mt-6 space-y-4">
                    {actions.map((action, index) => (
                        <motion.button
                            key={action.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{
                                scale: 1.02,
                                x: 4,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(action.path)}
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                px-5
                                py-5
                                transition-all
                                duration-300
                                hover:border-violet-400/30
                                hover:bg-violet-500/10
                                hover:shadow-[0_0_25px_rgba(124,58,237,0.2)]
                            "
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-violet-500
                                        to-fuchsia-500
                                        text-white
                                    "
                                >
                                    <action.icon size={22} />
                                </div>

                                <span className="font-semibold text-white">
                                    {action.title}
                                </span>
                            </div>

                            <ArrowRight
                                size={18}
                                className="
                                    text-violet-300
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}