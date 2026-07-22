import { motion } from "framer-motion";

export default function Button({

    children,

    type = "button",

    loading = false,

    disabled = false,

    className = "",

    ...props

}) {

    return (

        <motion.button

            whileHover={{
                scale: disabled ? 1 : 1.02
            }}

            whileTap={{
                scale: disabled ? 1 : 0.98
            }}

            type={type}

            disabled={loading || disabled}

            className={`
                h-12

                px-7

                rounded-xl

                border
                border-violet-500/20

                bg-gradient-to-r
                from-violet-600
                to-violet-500

                font-semibold
                text-white

                shadow-lg
                shadow-violet-900/20

                transition-all
                duration-200

                hover:brightness-110
                hover:shadow-violet-500/20

                disabled:opacity-50
                disabled:cursor-not-allowed

                ${className}
            `}

            {...props}

        >

            {loading ? "Loading..." : children}

        </motion.button>

    );

}