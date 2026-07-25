```jsx
import { motion } from "framer-motion";
import {
    CalendarDays,
    Users,
    ArrowRight,
    Trophy,
} from "lucide-react";

const tournaments = [
    {
        title: "Valorant Summer Cup",
        status: "Registration Open",
        teams: "12 / 32",
        date: "22 July",
    },
    {
        title: "Weekend Showdown",
        status: "Draft",
        teams: "0 / 16",
        date: "30 July",
    },
];

export default function RecentTournaments() {
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
                p-8
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
                    pointer-events-none
                "
            />

            <div
                className="
                    absolute
                    -top-24
                    -right-24
                    h-56
                    w-56
                    rounded-full
                    bg-violet-600/15
                    blur-[100px]
                "
            />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-violet-500/25
                                bg-violet-500/10
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                text-violet-300
                            "
                        >
                            <Trophy size={14} />
                            Tournament Management
                        </div>

                        <h2 className="mt-4 text-3xl font-black text-white">
                            Recent Tournaments
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Manage your latest hosted events.
                        </p>
                    </div>

                    <button
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-violet-300
                            transition-all
                            duration-300
                            hover:bg-violet-500/20
                            hover:border-violet-400
                        "
                    >
                        View All
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="space-y-5">
                    {tournaments.map((tournament, index) => (
                        <motion.div
                            key={tournament.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.08,
                            }}
                            whileHover={{ y: -4 }}
                            className="
                                group
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-6
                                transition-all
                                duration-300
                                hover:border-violet-400/30
                                hover:bg-white/10
                                hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {tournament.title}
                                    </h3>

                                    <div
                                        className="
                                            mt-3
                                            inline-flex
                                            rounded-full
                                            border
                                            border-emerald-500/20
                                            bg-emerald-500/10
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-emerald-300
                                        "
                                    >
                                        {tournament.status}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Users
                                        size={16}
                                        className="text-violet-400"
                                    />
                                    Teams: {tournament.teams}
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarDays
                                        size={16}
                                        className="text-violet-400"
                                    />
                                    {tournament.date}
                                </div>
                            </div>

                            <div
                                className="
                                    mt-6
                                    h-1
                                    w-full
                                    overflow-hidden
                                    rounded-full
                                    bg-white/5
                                "
                            >
                                <div
                                    className="
                                        h-full
                                        w-2/5
                                        rounded-full
                                        bg-gradient-to-r
                                        from-violet-500
                                        to-fuchsia-500
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
```
