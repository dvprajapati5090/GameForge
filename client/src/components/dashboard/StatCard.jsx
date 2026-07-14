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
                scale: 1.03
            }}
            transition={{
                duration: 0.25
            }}
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
                shadow-lg
                hover:shadow-cyan-500/20
                transition-all
            "
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-white">
                        {value}
                    </h2>

                </div>

                <div
                    className={`text-4xl ${color}`}
                >
                    {icon}
                </div>

            </div>
        </motion.div>
    );
}