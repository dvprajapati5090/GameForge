import { motion } from "framer-motion";

export default function Button({

    children,

    type = "button",

    variant = "primary",

    loading = false,

    disabled = false,

    className = "",

    ...props

}) {

    const variants = {

        primary:
            "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:brightness-110",

        secondary:
            "bg-white/10 border border-white/10 hover:bg-white/20",

        danger:
            "bg-red-500 hover:bg-red-400 text-white"

    };

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
                px-6
                rounded-2xl
                font-semibold
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}

            {...props}

        >

            {

                loading

                    ? "Loading..."

                    : children

            }

        </motion.button>

    );

}