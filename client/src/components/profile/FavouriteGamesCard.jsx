import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";

const gameIcons = {
    Valorant: "🎯",
    CS2: "🔫",
    BGMI: "📱",
    "Rocket League": "🚗",
    "Apex Legends": "🔥",
    "League of Legends": "⚔️"
};

export default function FavoriteGamesCard() {

    const user = useAuthStore((state) => state.user);

    return (

        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
            "
        >

            <h2 className="text-2xl font-bold mb-6">

                Favourite Games

            </h2>

            <div className="flex flex-wrap gap-4">

                {

                    user?.favoriteGames?.length ? (

                        user.favoriteGames.map((game, index) => (

                            <motion.div

                                key={game}

                                initial={{
                                    opacity: 0,
                                    scale: 0.8
                                }}

                                animate={{
                                    opacity: 1,
                                    scale: 1
                                }}

                                transition={{
                                    delay: index * 0.1
                                }}

                                whileHover={{
                                    scale: 1.08,
                                    y: -3
                                }}

                                className="
                                group
                                relative
                                overflow-hidden
                                px-6
                                py-5
                                rounded-2xl
                                border
                                border-white/10
                                bg-gradient-to-br
                                from-slate-900
                                to-slate-800
                                hover:border-cyan-400/40
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                "
                            >

                                <div className="text-4xl">

                                    {gameIcons[game]}

                                </div>

                                <p className="mt-3 font-bold">

                                    {game}

                                </p>

                                <p className="text-xs text-gray-500 mt-1">

                                    Favourite Game

                                </p>

                            </motion.div>

                        ))

                    ) : (

                        <p className="text-gray-400">

                            No favourite games added.

                        </p>

                    )

                }

            </div>

        </div>

    );

}