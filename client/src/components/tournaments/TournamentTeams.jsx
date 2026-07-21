export default function TournamentTeams({

    tournament

}) {

    return (

        <div className="bg-[#111827] rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6">

                Registered Teams

            </h2>

            <div className="space-y-4">

                {

                    tournament.registeredTeams.map(team => (

                        <div

                            key={team._id}

                            className="
                                flex
                                items-center
                                gap-4
                                p-3
                                rounded-lg
                                bg-white/5
                            "

                        >

                            <img

                                src={team.logo}

                                className="w-12 h-12 rounded-full"

                            />

                            <div>

                                <div className="font-semibold">

                                    {team.name}

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}