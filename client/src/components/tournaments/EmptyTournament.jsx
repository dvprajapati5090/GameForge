import { motion } from "framer-motion";
import { Trophy, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyTournament() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/20
                bg-white/5
                backdrop-blur-2xl
                py-20
                px-8
                text-center
                shadow-[0_0_40px_rgba(124,58,237,0.15)]
            "
        >
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-black
                    via-transparent
                    to-black
                "
            />

            <div
                className="
                    absolute
                    top-[-120px]
                    right-[-120px]
                    h-72
                    w-72
                    rounded-full
                    bg-white
                    blur-[120px]
                "
            />

            <div className="relative z-10 flex flex-col items-center">
                <div
                    className="
                        flex
                        h-28
                        w-28
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black
                        shadow-[0_0_35px_rgba(124,58,237,0.25)]
                    "
                >
                    <Trophy
                        size={52}
                        className="text-white"
                    />
                </div>

                <h2 className="mt-8 text-4xl font-black text-white">
                    No Tournaments Yet
                </h2>

                <p className="mt-4 max-w-lg text-gray-400 leading-7">
                    Start building your esports community by creating your
                    first tournament. Manage registrations, brackets,
                    schedules and matches from one premium dashboard.
                </p>

                <button
                    onClick={() => navigate("/host/create-tournament")}
                    className="
                        mt-10
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-black
                        to-black
                        px-7
                        py-4
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                        hover:shadow-[0_0_35px_rgba(124,58,237,0.4)]
                    "
                >
                    <PlusCircle size={20} />
                    Create Your First Tournament
                </button>
            </div>
        </motion.div>
    );
}