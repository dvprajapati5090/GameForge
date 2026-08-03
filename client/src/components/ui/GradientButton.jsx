import { motion } from "framer-motion";

export default function GradientButton({

    children,

    className = "",

    ...props

}) {

    return (

        <motion.button

            whileHover={{
                y: -2,
                scale: 1.02
            }}

            whileTap={{
                scale: 0.98
            }}

            transition={{
                duration: 0.2
            }}

            className={`
                group
                relative
                overflow-hidden

                inline-flex
                items-center
                justify-center
                gap-3

                h-12
                px-7

                rounded-xl

                font-semibold
                tracking-wide

                text-white

                border
                border-white/20

                bg-gradient-to-r
                from-[#4F1D95]
                via-[#6D28D9]
                to-[#7C3AED]

                shadow-[0_10px_28px_rgba(109,40,217,.28)]

                transition-all
                duration-300

                hover:border-white/20
                hover:shadow-[0_18px_45px_rgba(109,40,217,.45)]
                hover:brightness-105

                active:scale-[0.98]

                ${className}
            `}

            {...props}

        >

            {/* Shine */}

            <span
                className="
                    absolute
                    -left-1/3
                    top-0

                    h-full
                    w-12

                    -skew-x-12

                    bg-white/12

                    transition-all
                    duration-700

                    group-hover:left-[120%]
                "
            />

            {/* Glow */}

            <span
                className="
                    absolute
                    inset-0

                    rounded-xl

                    bg-gradient-to-r
                    from-black
                    via-purple-300/10
                    to-black

                    opacity-0
                    group-hover:opacity-100

                    transition-opacity
                    duration-300
                "
            />

            {/* Bottom Highlight */}

            <span
                className="
                    absolute
                    bottom-0
                    left-0

                    h-px
                    w-full

                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                "
            />

            <span
                className="
                    relative
                    z-10

                    flex
                    items-center
                    gap-3
                "
            >
                {children}

                <svg
                    className="
                        h-5
                        w-5

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>

            </span>

        </motion.button>

    );

}