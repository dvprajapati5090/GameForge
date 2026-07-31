import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
        `
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white

        shadow-lg
        shadow-purple-500/30

        hover:shadow-purple-500/70
        hover:brightness-110
        `,


        secondary:
        `
        bg-white/10
        border
        border-white/10
        text-white

        hover:bg-white/20
        `,


        danger:
        `
        bg-red-500
        text-white
        hover:bg-red-400
        `

    };


    return (

        <motion.button

            whileHover={{
                scale: disabled ? 1 : 1.04
            }}

            whileTap={{
                scale: disabled ? 1 : 0.96
            }}

            type={type}

            disabled={loading || disabled}

            className={`
                h-12
                px-7
                rounded-2xl

                flex
                items-center
                justify-center
                gap-2

                font-semibold

                transition-all
                duration-300

                cursor-pointer

                disabled:opacity-40
                disabled:cursor-not-allowed

                ${variants[variant]}

                ${className}
            `}

            {...props}

        >

            {
                loading
                ?
                <>
                    <Loader2
                        size={18}
                        className="animate-spin"
                    />
                    Loading...
                </>
                :
                children
            }


        </motion.button>

    );

}