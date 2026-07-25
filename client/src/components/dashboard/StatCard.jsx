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
                y: -4,
                scale: 1.015
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
                border-white/5

                bg-[#141B2D]/90

                backdrop-blur-2xl

                p-5

                transition-all
                duration-300

                hover:border-violet-500/20
                hover:shadow-[0_12px_32px_rgba(139,92,246,0.12)]
            "
        >

            {/* Ambient Glow */}

            <div
                className="
                    absolute
                    -top-16
                    -right-16

                    h-40
                    w-40

                    rounded-full

                    bg-violet-500/8

                    blur-[90px]

                    opacity-0

                    transition-all
                    duration-500

                    group-hover:opacity-100
                "
            />

            <div className="relative z-10 flex items-center justify-between">

                <div className="flex-1">

                    <p
                        className="
                            text-sm
                            font-semibold

                            tracking-wide

                            text-slate-400
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            mt-2

                            text-[2.2rem]
                            leading-none

                            font-black

                            tracking-tight

                            text-white
                        "
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className="
                        flex
                        h-12
                        w-12

                        items-center
                        justify-center

                        rounded-2xl

                        border
                        border-white/5

                        bg-white/5

                        transition-all
                        duration-300

                        group-hover:bg-violet-500/10
                        group-hover:scale-105
                    "
                >

                    <div className={`${color} text-xl`}>

                        {icon}

                    </div>

                </div>

            </div>

        </motion.div>

    );
}