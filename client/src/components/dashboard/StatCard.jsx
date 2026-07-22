import { motion } from "framer-motion";

export default function StatCard({
    title,
    value,
    icon,
    color
}) {
    return (

        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02
            }}
            transition={{
                duration: 0.25
            }}
            className="
                group
                relative
                overflow-hidden

                rounded-3xl

                border
                border-white/10

                bg-gradient-to-br
                from-white/8
                via-white/5
                to-white/[0.03]

                backdrop-blur-2xl

                p-6

                transition-all
                duration-300

                hover:border-violet-400/20
                hover:shadow-[0_10px_35px_rgba(139,92,246,0.15)]
            "
        >

            {/* Glow */}

            <div
                className="
                    absolute
                    -top-10
                    -right-10

                    h-32
                    w-32

                    rounded-full

                    bg-violet-500/10

                    blur-3xl

                    opacity-0

                    transition-all
                    duration-500

                    group-hover:opacity-100
                "
            />

            <div className="relative z-10 flex items-center justify-between">

                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            tracking-wide
                            text-slate-400
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            mt-3

                            text-3xl
                            font-black

                            text-white
                        "
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-2xl

                        border
                        border-white/10

                        bg-white/5

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        group-hover:scale-110
                        group-hover:bg-violet-500/10
                    "
                >

                    <div className={`text-2xl ${color}`}>

                        {icon}

                    </div>

                </div>

            </div>

        </motion.div>

    );
}