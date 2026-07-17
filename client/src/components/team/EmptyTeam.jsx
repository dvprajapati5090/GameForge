import { Users, Plus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GlowCard from "../ui/GlowCard";
import GradientButton from "../ui/GradientButton";

import { motion } from "framer-motion";

export default function EmptyTeam() {

    const navigate = useNavigate();

    return (

        <div
            className="
                flex
                justify-center
                items-center
                min-h-[75vh]
            "
        >

            <GlowCard
                className="
                    relative
                    overflow-hidden
                    max-w-2xl
                    w-full
                    p-12
                    text-center
                "
            >

                <div
                    className="
                        absolute
                        -top-28
                        -right-28
                        w-72
                        h-72
                        rounded-full
                        bg-cyan-500/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-24
                        -left-24
                        w-72
                        h-72
                        rounded-full
                        bg-purple-600/10
                        blur-3xl
                    "
                />

                <div className="relative z-10">

                    <motion.div

                        animate={{
                            y: [0, -8, 0]
                        }}

                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}

                        className="
                            mx-auto
                            w-24
                            h-24
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-500
                            to-purple-600
                            flex
                            items-center
                            justify-center
                            shadow-[0_0_40px_rgba(6,182,212,0.4)]
                        "

                    >

                        <Users size={42} />

                    </motion.div>

                    <p
                        className="
                            mt-8
                            text-cyan-400
                            tracking-[0.35em]
                            text-sm
                            font-bold
                            uppercase
                        "
                    >

                        Team System

                    </p>

                    <h1
                        className="
                            mt-3
                            text-5xl
                            font-black
                        "
                    >

                        No Team Found

                    </h1>

                    <p
                        className="
                            mt-6
                            text-lg
                            text-gray-400
                            max-w-xl
                            mx-auto
                            leading-8
                        "
                    >

                        Build your own esports roster or accept an invitation
                        from another captain to compete in tournaments.

                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            justify-center
                            gap-5
                            mt-12
                        "
                    >

                        <GradientButton
                            onClick={() => navigate("/team/create")}
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <Plus size={18} />

                            Create Team

                        </GradientButton>

                        <button
                            className="
                                flex
                                items-center
                                gap-3
                                px-7
                                py-3
                                rounded-xl
                                border
                                border-cyan-500/30
                                bg-slate-900
                                hover:bg-slate-800
                                transition-all
                            "
                        >

                            <Mail size={18} />

                            View Invitations

                        </button>

                    </div>

                </div>

            </GlowCard>

        </div>

    );

}