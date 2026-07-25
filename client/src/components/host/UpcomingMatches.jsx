import { motion } from "framer-motion";
import {
    CalendarDays,
    Clock3,
    Swords,
    ArrowRight,
} from "lucide-react";

const matches = [
    {
        title: "Quarter Final",
        teams: "Team Alpha vs Team Bravo",
        time: "Today • 7:00 PM",
    },
    {
        title: "Semi Final",
        teams: "Winner Match 1 vs Winner Match 2",
        time: "Tomorrow • 6:30 PM",
    },
];

export default function UpcomingMatches() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-violet-500/20
                bg-white/5
                backdrop-blur-2xl
                p-6
                shadow-[0_0_40px_rgba(124,58,237,0.12)]
            "
        >
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-violet-600/10
                    via-transparent
                    to-fuchsia-600/10
                "
            />

            <div className="relative z-10">
                <div
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-violet-500/20
                        bg-violet-500/10
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-violet-300
                    "
                >
                    <CalendarDays size={14} />
                    Match Schedule
                </div>

                <h2 className="mt-4 text-2xl font-black text-white">
                    Upcoming Matches
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                    Your next scheduled tournament matches.
                </p>

                <div className="mt-6 space-y-4">
                    {matches.map((match, index) => (
                        <motion.div
                            key={match.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{
                                y: -3,
                            }}
                            className="
                                group
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-5
                                transition-all
                                duration-300
                                hover:border-violet-400/30
                                hover:bg-violet-500/10
                                hover:shadow-[0_0_25px_rgba(124,58,237,0.15)]
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-violet-500
                                            to-fuchsia-500
                                            text-white
                                        "
                                    >
                                        <Swords size={20} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-white">
                                            {match.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-400">
                                            {match.teams}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2 text-violet-300">
                                            <Clock3 size={15} />
                                            <span className="text-sm font-medium">
                                                {match.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="
                                        text-violet-400
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}