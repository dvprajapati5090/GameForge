import { motion } from "framer-motion";

export default function GlowCard({

    children,
    className = ""

}) {

    return (

        <motion.div

            whileHover={{
                y: -6,
                scale: 1.01
            }}

            transition={{
                duration: 0.25
            }}

            className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-cyan-400/30
                ${className}
            `}

        >

            <div
                className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.12),transparent_45%)]
                "
            />

            <div
                className="
                    absolute
                    top-0
                    left-0
                    h-1
                    w-0
                    bg-gradient-to-r
                    from-cyan-400
                    to-purple-500
                    transition-all
                    duration-500
                    group-hover:w-full
                "
            />

            <div
                className="
                    absolute
                    -top-16
                    -right-16
                    w-40
                    h-40
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                "
            />

            <div className="relative z-10">

                {children}

            </div>

        </motion.div>

    );

}