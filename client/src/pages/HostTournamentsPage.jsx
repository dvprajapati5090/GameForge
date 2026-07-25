import { motion } from "framer-motion";

import useHostTournaments from "../hooks/useHostTournaments";

import HostTournamentCard from "../components/host/tournaments/HostTournamentCard";
import EmptyTournament from "../components/host/EmptyTournament";

export default function HostTournamentsPage() {
    const { data, isLoading } = useHostTournaments();

    if (isLoading) {
        return (
            <div
                className="
                    flex
                    h-[60vh]
                    items-center
                    justify-center
                "
            >
                <div
                    className="
                        h-16
                        w-16
                        rounded-full
                        border-4
                        border-violet-500/20
                        border-t-violet-500
                        animate-spin
                    "
                />
            </div>
        );
    }

    if (!data) {
        return <EmptyTournament />;
    }

    const tournaments = data.data.tournaments;

    if (!tournaments.length) {
        return <EmptyTournament />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div>
                <div
                    className="
                        inline-flex
                        items-center
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
                    Tournament Management
                </div>

                <h1 className="mt-5 text-5xl font-black text-white">
                    My Tournaments
                </h1>

                <p className="mt-3 text-gray-400">
                    View, manage and monitor every tournament you've created.
                </p>
            </div>

            <div className="grid gap-8">
                {tournaments.map((tournament, index) => (
                    <motion.div
                        key={tournament._id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.06,
                        }}
                    >
                        <HostTournamentCard
                            tournament={tournament}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}