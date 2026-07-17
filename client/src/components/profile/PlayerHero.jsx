import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";

import ProfileAvatar from "./ProfileAvatar";
import HeroInfo from "./HeroInfo";
import HeroStats from "./HeroStats";
import HeroActions from "./HeroActions";

export default function PlayerHero({ player }) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.5
            }}

        >

            <ProfileAvatar player={player} />

            <GlassCard
                className="
                    relative
                    overflow-hidden
                    mt-8
                    px-10
                    py-10
                "
            >

                <div
                    className="
                        absolute
                        -top-24
                        -right-24
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

                    <HeroInfo player={player} />

                    <HeroStats player={player} />

                    <HeroActions player={player} />

                </div>

            </GlassCard>

        </motion.div>

    );

}