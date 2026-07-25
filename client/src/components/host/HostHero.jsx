import { motion } from "framer-motion";
import { ShieldCheck, PlusCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

export default function HostHero() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);

    return (
        <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-violet-500/20
                bg-white/5
                backdrop-blur-2xl
                p-8
                md:p-12
                shadow-[0_0_50px_rgba(124,58,237,0.18)]
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
                    pointer-events-none
                "
            />

            <div
                className="
                    absolute
                    -top-32
                    -right-28
                    h-80
                    w-80
                    rounded-full
                    bg-violet-600/20
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    -bottom-40
                    -left-24
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
                    inset-0
                    opacity-[0.03]
                    [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
                    [background-size:34px_34px]
                "
            />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-violet-500/30
                            bg-violet-500/10
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-violet-300
                            backdrop-blur-xl
                        "
                    >
                        <ShieldCheck size={16} />
                        Host Control Center
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="
                            mt-6
                            text-4xl
                            md:text-5xl
                            xl:text-6xl
                            font-black
                            tracking-tight
                            text-white
                        "
                    >
                        Welcome back,
                        <br />

                        <span
                            className="
                                bg-gradient-to-r
                                from-violet-300
                                via-fuchsia-300
                                to-violet-400
                                bg-clip-text
                                text-transparent
                            "
                        >
                            {user.displayName}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="
                            mt-6
                            max-w-2xl
                            text-base
                            md:text-lg
                            leading-8
                            text-gray-300
                        "
                    >
                        Create premium esports tournaments, manage registrations,
                        generate brackets, monitor live matches, and oversee every
                        event from one powerful dashboard.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="mt-8 flex flex-wrap items-center gap-4"
                    >
                        <button
                            onClick={() => navigate("/host/create-tournament")}
                            className="
                                group
                                inline-flex
                                items-center
                                gap-3
                                rounded-2xl
                                bg-gradient-to-r
                                from-violet-600
                                to-fuchsia-600
                                px-7
                                py-4
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                                hover:shadow-[0_0_35px_rgba(124,58,237,0.45)]
                                active:scale-[0.98]
                            "
                        >
                            <PlusCircle
                                size={20}
                                className="transition-transform duration-300 group-hover:rotate-90"
                            />

                            Create Tournament
                        </button>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                px-5
                                py-4
                                backdrop-blur-xl
                            "
                        >
                            <Sparkles
                                size={18}
                                className="text-violet-400"
                            />

                            <span className="text-sm text-gray-300">
                                Ready to host your next event
                            </span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="
                        hidden
                        xl:flex
                        relative
                        h-72
                        w-72
                        shrink-0
                        items-center
                        justify-center
                    "
                >
                    <div
                        className="
                            absolute
                            h-72
                            w-72
                            rounded-full
                            border
                            border-violet-500/20
                        "
                    />

                    <div
                        className="
                            absolute
                            h-56
                            w-56
                            rounded-full
                            border
                            border-fuchsia-500/20
                        "
                    />

                    <div
                        className="
                            absolute
                            h-40
                            w-40
                            rounded-full
                            bg-gradient-to-br
                            from-violet-500/25
                            to-fuchsia-500/25
                            blur-xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            h-28
                            w-28
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-violet-500/30
                            bg-white/10
                            backdrop-blur-2xl
                            shadow-[0_0_45px_rgba(124,58,237,0.35)]
                        "
                    >
                        <ShieldCheck
                            size={46}
                            className="text-violet-300"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}