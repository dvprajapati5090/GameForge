const tournaments = [

    {
        title: "Valorant Summer Cup",
        status: "Registration Open",
        teams: "12 / 32",
        date: "22 July"
    },

    {
        title: "Weekend Showdown",
        status: "Draft",
        teams: "0 / 16",
        date: "30 July"
    }

];

export default function RecentTournaments() {

    return (

        <div className="rounded-3xl bg-slate-900 border border-white/10 p-8">

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-black">

                    Recent Tournaments

                </h2>

                <button className="text-cyan-400">

                    View All

                </button>

            </div>

            <div className="space-y-5">

                {

                    tournaments.map((tournament) => (

                        <div

                            key={tournament.title}

                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-6
                            "

                        >

                            <h3 className="text-xl font-bold">

                                {tournament.title}

                            </h3>

                            <p className="text-gray-400 mt-2">

                                {tournament.status}

                            </p>

                            <div className="flex justify-between mt-5">

                                <span>

                                    Teams: {tournament.teams}

                                </span>

                                <span>

                                    {tournament.date}

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}