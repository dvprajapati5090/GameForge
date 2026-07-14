import { motion } from "framer-motion";

export default function GradientButton({

    children,

    className = "",

    ...props

}) {

    return (

        <motion.button

            whileHover={{

                scale: 1.05,

                y: -2

            }}

            whileTap={{

                scale: 0.98

            }}

            transition={{

                duration: 0.2

            }}

            className={`
                px-6
                py-3
                rounded-xl
                font-semibold
                bg-gradient-to-r
                from-purple-600
                to-cyan-500
                shadow-lg
                hover:shadow-cyan-500/30
                transition-all
                ${className}
            `}

            {...props}

        >

            {children}

        </motion.button>

    );

}