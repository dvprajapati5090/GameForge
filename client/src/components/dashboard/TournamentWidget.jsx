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

        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
            "
        >

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Upcoming Tournaments
                </h2>

                <button
                    className="
                        text-cyan-400
                        hover:text-cyan-300
                        transition
                    "
                >
                    View All
                </button>

            </div>

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

    );

}