import { motion } from "framer-motion";

export default function Background() {
    return (
        <div className="fixed inset-0 overflow-hidden">

            {/* Animated Gradient */}
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-slate-950
                    via-indigo-950
                    to-slate-900
                "
            />

            {/* Purple Orb */}
            <motion.div
                animate={{
                    x: [0, 80, -50, 0],
                    y: [0, -60, 50, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="
                    absolute
                    w-96
                    h-96
                    bg-purple-600/30
                    blur-[130px]
                    rounded-full
                    top-10
                    left-10
                "
            />

            {/* Blue Orb */}
            <motion.div
                animate={{
                    x: [0, -80, 60, 0],
                    y: [0, 80, -30, 0]
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="
                    absolute
                    w-[420px]
                    h-[420px]
                    bg-blue-600/30
                    blur-[140px]
                    rounded-full
                    bottom-0
                    right-0
                "
            />

            {/* Cyan Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 30, 0]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity
                }}
                className="
                    absolute
                    w-72
                    h-72
                    bg-cyan-500/20
                    blur-[120px]
                    rounded-full
                    bottom-40
                    left-1/3
                "
            />

            {/* Glass Reflection */}
            <div
                className="
                    absolute
                    inset-0
                    backdrop-blur-[2px]
                "
            />
        </div>
    );
}