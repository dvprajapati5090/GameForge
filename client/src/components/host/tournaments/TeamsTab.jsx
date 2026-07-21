import { Users } from "lucide-react";

export default function TeamsTab({ tournament }) {

    const teams = tournament.registeredTeams || [];

    if (teams.length === 0) {

        return (

            <div className="rounded-3xl bg-slate-900 p-12 text-center">

                <Users
                    className="mx-auto mb-4 text-gray-500"
                    size={50}
                />

                <h2 className="text-2xl font-bold">

                    No Teams Registered

                </h2>

                <p className="text-gray-400 mt-3">

                    Teams will appear here once registration starts.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-4">

            {

                teams.map(team => (

                    <div

                        key={team._id}

                        className="
                            rounded-2xl
                            bg-slate-900
                            border
                            border-white/10
                            p-5
                            flex
                            justify-between
                            items-center
                        "

                    >

                        <div className="flex items-center gap-4">

                            <img

                                src={
                                    team.logo ||
                                    "https://placehold.co/60x60"
                                }

                                alt={team.name}

                                className="w-14 h-14 rounded-xl"

                            />

                            <div>

                                <h3 className="font-bold text-lg">

                                    {team.name}

                                </h3>

                                <p className="text-gray-400 text-sm">

                                    Captain:

                                    {" "}

                                    {team.captain?.displayName}

                                </p>

                            </div>

                        </div>

                        <span className="text-cyan-400 font-semibold">

                            {team.members?.length || 0} Players

                        </span>

                    </div>

                ))

            }

        </div>

    );

}