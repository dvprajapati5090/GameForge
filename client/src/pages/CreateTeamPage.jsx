import { motion } from "framer-motion";

import GlowCard from "../components/ui/GlowCard";
import CreateTeamForm from "../components/team/CreateTeamForm";

export default function CreateTeamPage() {

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
                duration: 0.4
            }}

            className="
                max-w-5xl
                mx-auto
                py-12
                px-4
            "

        >

            <div className="text-center mb-10">

                <p
                    className="
                        uppercase
                        tracking-[0.4em]
                        text-cyan-400
                        text-sm
                        font-bold
                    "
                >

                    TEAM MANAGEMENT

                </p>

                <h1
                    className="
                        text-5xl
                        font-black
                        mt-4
                    "
                >

                    Create Your Team

                </h1>

                <p
                    className="
                        mt-4
                        text-lg
                        text-gray-400
                    "
                >

                    Assemble your squad and compete in GameForge tournaments.

                </p>

            </div>

            <GlowCard
                className="
                    p-10
                "
            >

                <CreateTeamForm />

            </GlowCard>

        </motion.div>

    );

}