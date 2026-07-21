export default function TournamentTeams({

    tournament

}) {

    return (

        <div className="rounded-3xl bg-slate-900 p-8">

            <h2 className="text-3xl font-black mb-8">

                Registered Teams

            </h2>

            {

                tournament.registeredTeams.length === 0 ?

                (

                    <div className="text-center py-12 text-gray-400">

                        No teams registered.

                    </div>

                )

                :

                <div className="space-y-4">

                    {

                        tournament.registeredTeams.map(team => (

                            <div

                                key={team._id}

                                className="flex justify-between items-center bg-slate-800 rounded-xl p-4"

                            >

                                <div className="flex items-center gap-4">

                                    <img

                                        src={
                                            team.logo ||
                                            "/team-placeholder.png"
                                        }

                                        className="w-12 h-12 rounded-full"

                                    />

                                    <h3>

                                        {team.name}

                                    </h3>

                                </div>

                            </div>

                        ))

                    }

                </div>

            }

        </div>

    );

}