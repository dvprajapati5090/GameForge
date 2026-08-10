import { TeamLogoFallback } from "../tournaments/TournamentBanner";

export default function TournamentTeams({

    tournament

}) {


    return (

        <div className="rounded-3xl bg-black border border-white/10 p-8">

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

                                className="flex justify-between items-center bg-black border border-white/10 rounded-xl p-4"

                            >

                                <div className="flex items-center gap-4">

                                    {team.logo ? (
                                        <img
                                            src={team.logo}
                                            className="w-12 h-12 rounded-full object-cover"
                                            alt={team.name}
                                        />
                                    ) : (
                                        <TeamLogoFallback name={team.name} size={48} />
                                    )}

                                    <h3>{team.name}</h3>

                                </div>

                            </div>

                        ))

                    }

                </div>

            }

        </div>

    );

}