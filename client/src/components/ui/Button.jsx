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
        group
        relative
        overflow-hidden
        border
        border-[#0a9396]/50
        bg-[#0a9396]/10
        text-white
        
        shadow-[0_0_15px_rgba(10,147,150,0.15)]
        
        hover:border-[#0a9396]
        hover:bg-[#0a9396]
        hover:text-[#001219]
        hover:shadow-[0_0_30px_rgba(10,147,150,0.4)]
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
        bg-white/20
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