import useAuthStore from "../../store/authStore";
import { motion } from "framer-motion";

export default function ProfileAvatar({ player }) {

    const profile = player;

    const banner =
        profile?.riotCard
            ? `https://media.valorant-api.com/playercards/${profile.riotCard}/largeart.png`
            : null;

    return (

        <div
            className="
                relative
                h-80
                rounded-3xl
                overflow-hidden
                border
                border-white/10
            "
        >

            {/* Banner */}

            {
                banner ? (

                    <img
                        src={banner}
                        alt="Player Card"
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover object-top
                        "
                    />

                ) : (

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-slate-900
                            via-purple-900
                            to-cyan-900
                        "
                    />

                )
            }

            {/* Dark Overlay */}

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-black/20
                    via-slate-900/35
                    to-slate-950
                "
            />

            {/* Blur Glow */}

            <div
                className="
                    absolute
                    -top-20
                    -left-20
                    w-72
                    h-56
                    rounded-full
                    bg-cyan-500/20
                    blur-3xl
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    -bottom-20
                    -right-20
                    w-72
                    h-56
                    bg-purple-600/20
                    rounded-full
                    blur-3xl
                "
            />

            {/* Avatar */}

            <motion.div

                initial={{
                    scale: 0.8,
                    opacity: 0
                }}

                animate={{
                    scale: 1,
                    opacity: 1,
                    y:[0,-8,0]
                }}

                transition={{
                    delay: 0.2,
                    duration: 0.5,
                    y:{

                        duration:5,

                        repeat:Infinity,

                        ease:"easeInOut"

                    }
                }}

                className="
                    absolute
                    left-1/2
                    bottom-6
                    -translate-x-1/2
                    z-30
                "
            >

                <div

                    className="
                        absolute
                        inset-0
                        rounded-full
                        animate-[spin_12s_linear_infinite]
                        opacity-40
                        blur-sm
                        bg-gradient-to-r
                        from-cyan-400
                        via-purple-500
                        to-cyan-400
                    "

                />

                <div
                    className="
                        w-48
                        h-48
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-500
                        via-blue-500
                        to-purple-600
                        p-1.5
                        shadow-[0_0_45px_rgba(6,182,212,0.45)]
                    "
                >

                    <div
                        className="
                            w-full
                            h-full
                            rounded-full
                            overflow-hidden
                            bg-slate-900
                        "
                    >

                        {
                            profile?.riotCard ? (

                                <motion.img
                                    initial={{
                                        scale:1.08
                                    }}

                                    animate={{
                                        scale:1
                                    }}

                                    transition={{
                                        duration:8
                                    }}
                                    src={`https://media.valorant-api.com/playercards/${profile.riotCard}/displayicon.png`}
                                    alt="Player Card"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <div
                                    className="
                                        w-full
                                        h-full
                                        flex
                                        items-center
                                        justify-center
                                        text-5xl
                                        font-black
                                    "
                                >
                                    {profile?.displayName?.charAt(0)?.toUpperCase()}
                                </div>

                            )
                        }

                        <div
                            className="
                                absolute
                                -bottom-4
                                left-1/2
                                -translate-x-1/2
                                px-4
                                py-1.5
                                rounded-full
                                bg-gradient-to-r
                                from-yellow-500
                                to-amber-400
                                text-slate-900
                                text-sm
                                font-black
                                shadow-lg
                                border
                                border-yellow-300
                            "
                        >

                            LV {profile?.accountLevel ?? 1}

                        </div>

                        <div
                            className="
                                absolute
                                bottom-2
                                right-2
                                w-6
                                h-6
                                rounded-full
                                bg-emerald-400
                                border-[5px]
                                border-slate-900
                                shadow-[0_0_18px_rgba(16,185,129,0.8)]
                            "
                        />

                    </div>

                </div>

                

            </motion.div>

        </div>

    );

}