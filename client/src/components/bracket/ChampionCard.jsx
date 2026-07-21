import { Trophy, Medal, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function ChampionCard({ tournament }) {

    if (
        tournament.status !== "COMPLETED" ||
        !tournament.winner
    ) {
        return null;
    }

    return (

        <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            className="
                relative
                overflow-hidden
                rounded-3xl
                p-8
                border
                border-yellow-500/40
                bg-gradient-to-r
                from-yellow-500/10
                via-amber-500/10
                to-orange-500/10
            "

        >

            <div className="absolute -top-16 -right-16 w-56 h-56 bg-yellow-500/20 rounded-full blur-3xl"/>

            <div className="flex items-center gap-6 relative z-10">

                <div className="
                    w-24
                    h-24
                    rounded-full
                    bg-yellow-500/20
                    flex
                    items-center
                    justify-center
                ">

                    <Trophy
                        size={50}
                        className="text-yellow-400"
                    />

                </div>

                <div className="flex-1">

                    <p className="text-yellow-400 font-semibold">

                        TOURNAMENT CHAMPION

                    </p>

                    <h1 className="text-4xl font-black mt-2">

                        {tournament.winner.name}

                    </h1>

                    <div className="flex gap-6 mt-6 text-gray-300">

                        <div className="flex items-center gap-2">

                            <Medal size={18}/>

                            ₹{tournament.prizePool}

                        </div>

                        <div className="flex items-center gap-2">

                            <Users size={18}/>

                            {tournament.maxTeams} Teams

                        </div>

                        <div className="flex items-center gap-2">

                            <Calendar size={18}/>

                            {
                                new Date(
                                    tournament.updatedAt
                                ).toLocaleDateString()
                            }

                        </div>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}