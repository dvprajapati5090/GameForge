import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StepIndicator({ step }) {

    const steps = [
        "Basic",
        "Security",
        "Riot",
        "Review"
    ];

    return (

        <div className="flex items-center justify-between gap-1 sm:gap-3">

            {steps.map((item, index) => {

                const current = index + 1;

                const completed = step > current;

                const active = step === current;

                return (

                    <div
                        key={item}
                        className="flex items-center flex-1"
                    >

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                flex-1
                                relative
                            "
                        >

                            <motion.div

                                initial={{
                                    scale: 0.85,
                                    opacity: 0
                                }}

                                animate={{
                                    scale: 1,
                                    opacity: 1
                                }}

                                transition={{
                                    duration: 0.35
                                }}

                                className={`
                                    relative

                                    w-8 h-8
                                    sm:w-10 sm:h-10

                                    rounded-full

                                    flex
                                    items-center
                                    justify-center

                                    text-xs sm:text-sm
                                    font-bold

                                    transition-all
                                    duration-300

                                    border

                                    ${
                                        completed
                                            ? "bg-black border-white/20 text-white shadow-lg shadow-[#e8003d]/40"
                                            : active
                                            ? "bg-black border-white/20 text-white shadow-lg shadow-[#e8003d]/30"
                                            : "bg-white/5 border-white/10 text-slate-500"
                                    }
                                `}
                            >

                                {active && (

                                    <div
                                        className="
                                            absolute
                                            inset-0

                                            rounded-full

                                            bg-black

                                            animate-ping
                                        "
                                    />

                                )}

                                <span className="relative z-10">

                                    {

                                        completed

                                            ? <Check size={14} />

                                            : current

                                    }

                                </span>

                            </motion.div>

                            {/* Label — hidden on very small screens to avoid cramping */}
                            <p
                                className={`
                                    mt-2
                                    text-[10px] sm:text-xs
                                    font-medium
                                    hidden xs:block sm:block
                                    transition-colors
                                    ${
                                        active || completed
                                            ? "text-white"
                                            : "text-slate-500"
                                    }
                                `}
                            >

                                {item}

                            </p>

                        </div>

                        {

                            index < steps.length - 1 && (

                                // Connector line — hidden on mobile to keep it clean
                                <div
                                    className="
                                        relative
                                        flex-1
                                        h-[1px]
                                        mx-1 sm:mx-2
                                        rounded-full
                                        bg-white/10
                                        overflow-hidden
                                        hidden sm:block
                                    "
                                >

                                    <motion.div

                                        initial={{
                                            width: 0
                                        }}

                                        animate={{
                                            width:
                                                step > current
                                                    ? "100%"
                                                    : "0%"
                                        }}

                                        transition={{
                                            duration: 0.4
                                        }}

                                        className="
                                            h-full
                                            bg-gradient-to-r
                                            from-white/30
                                            to-white/10
                                        "

                                    />

                                </div>

                            )

                        }

                    </div>

                );

            })}

        </div>

    );

}