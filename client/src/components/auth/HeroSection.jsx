import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col justify-center w-3/5 px-20"
        >
            <h1 className="text-7xl font-black leading-tight">
                <span className="text-white">GAME</span>

                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    FORGE
                </span>
            </h1>

            <p className="text-2xl text-gray-300 mt-6 max-w-xl">
                Organize tournaments, build your dream team,
                verify Riot profiles and dominate the competition.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-12 max-w-2xl">

                {[
                    "🎯 Riot Verified",
                    "🏆 Tournament Hosting",
                    "👥 Team Management",
                    "📊 Live Player Stats"
                ].map((item) => (

                    <div
                        key={item}
                        className="
                            rounded-2xl
                            border border-white/10
                            bg-white/5
                            backdrop-blur-md
                            p-5
                            text-white
                            hover:scale-105
                            transition-all
                        "
                    >
                        {item}
                    </div>

                ))}

            </div>

        </motion.div>
    );
}