import { motion } from "framer-motion";

export default function MiniStat({
    label,
    value,
    icon,
}) {

    return (

        <motion.div

            whileHover={{
                y: -4,
                scale: 1.03,
            }}

            transition={{
                duration: 0.25,
            }}

            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
                flex
                items-center
                gap-4
            "
        >

            <div
                className="
                    w-12
                    h-12
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    text-white
                "
            >

                {icon}

            </div>

            <div>

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-400
                    "
                >

                    {label}

                </p>

                <h3
                    className="
                        text-xl
                        font-bold
                        text-white
                    "
                >

                    {value || "--"}

                </h3>

            </div>

        </motion.div>

    );

}