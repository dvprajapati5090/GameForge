import { ArrowRight } from "lucide-react";

import UpcomingTournament from "./UpcomingTournament";

const tournaments = [

    {
        id: 1,
        title: "Valorant Championship",
        game: "Valorant",
        date: "25 Jul 2026",
        teams: 16
    },

    {
        id: 2,
        title: "BGMI Pro League",
        game: "BGMI",
        date: "28 Jul 2026",
        teams: 32
    },

    {
        id: 3,
        title: "CS2 Masters",
        game: "Counter Strike 2",
        date: "02 Aug 2026",
        teams: 8
    }

];

export default function TournamentWidget() {

    return (

        <section
            className="
                relative
                overflow-hidden

                rounded-3xl

                border
                border-white/10

                bg-[#101624]

                backdrop-blur-2xl

                p-6

                transition-all
                duration-300

                hover:border-violet-500/20
                hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]
            "
        >

            {/* Ambient Lights */}

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-500/10 blur-[130px]" />

            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[110px]" />

            <div className="relative z-10">

                {/* Header */}

                <div className="flex items-start justify-between">

                    <div>

                        <span
                            className="
                                inline-flex

                                rounded-full

                                border
                                border-violet-500/20

                                bg-violet-500/10

                                px-3
                                py-1

                                text-[11px]
                                font-semibold

                                uppercase

                                tracking-[3px]

                                text-violet-300
                            "
                        >
                            Tournament Hub
                        </span>

                        <h2
                            className="
                                mt-4

                                text-3xl
                                font-black

                                text-white
                            "
                        >
                            Upcoming Tournaments
                        </h2>

                        <p
                            className="
                                mt-2

                                max-w-md

                                text-sm

                                leading-6

                                text-slate-400
                            "
                        >
                            Register, compete and climb the leaderboard in
                            upcoming competitive events.
                        </p>

                    </div>

                    <button
                        className="
                            group

                            flex
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-white/10

                            bg-white/5

                            px-4
                            py-2

                            text-sm
                            font-medium

                            text-violet-300

                            transition-all
                            duration-300

                            hover:border-violet-400/30
                            hover:bg-violet-500/10
                            hover:text-white
                        "
                    >
                        View All

                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />

                    </button>

                </div>

                {/* Divider */}

                <div className="my-6 h-px bg-gradient-to-r from-violet-500/30 via-white/10 to-transparent" />

                {/* Tournament List */}

                <div className="space-y-4">

                    {

                        tournaments.map((tournament) => (

                            <UpcomingTournament
                                key={tournament.id}
                                tournament={tournament}
                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}