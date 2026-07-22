import { motion } from "framer-motion";

export default function GlowCard({

    children,

    className = ""

}) {

    return (

        <motion.div

            whileHover={{
                y: -4,
                scale: 1.01
            }}

            transition={{
                duration: 0.22
            }}

            className={`
                group

                relative

                overflow-hidden

                rounded-2xl

                border
                border-white/10

                bg-[#121826]/65

                backdrop-blur-2xl

                shadow-[0_18px_50px_rgba(0,0,0,.35)]

                transition-all
                duration-300

                hover:border-violet-500/40
                hover:shadow-[0_20px_60px_rgba(139,92,246,.12)]

                ${className}
            `}

        >

            {/* Soft Violet Ambient Glow */}

            <div
                className="
                    absolute
                    inset-0

                    opacity-0
                    group-hover:opacity-100

                    transition-opacity
                    duration-500

                    bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,.12),transparent_55%)]
                "
            />

            {/* Corner Glow */}

            <div
                className="
                    absolute

                    -top-20
                    -right-20

                    h-48
                    w-48

                    rounded-full

                    bg-violet-500/10

                    blur-3xl
                "
            />

            {/* Subtle Bottom Glow */}

            <div
                className="
                    absolute

                    -bottom-24
                    -left-20

                    h-52
                    w-52

                    rounded-full

                    bg-violet-500/5

                    blur-3xl
                "
            />

            <div className="relative z-10">

                {children}

            </div>

        </motion.div>

    );

}