export default function RegisteredTeams({

    teams

}) {

    return (

        <div
            className="
                mt-10
                bg-slate-900
                rounded-2xl
                border
                border-slate-800
                p-8
            "
        >

            <h2 className="text-2xl font-bold mb-6">

                Registered Teams

            </h2>

            {

                teams.length === 0 ?

                    <p className="text-gray-400">

                        No teams registered yet.

                    </p>

                    :

                    <div className="space-y-3">

                        {

                            teams.map(team => (

                                <div

                                    key={team._id}

                                    className="
                                        flex
                                        justify-between
                                        bg-slate-800
                                        rounded-lg
                                        p-4
                                    "

                                >

                                    <span>

                                        {team.name}

                                    </span>

                                    <span className="text-cyan-400">

                                        {team.members.length} Players

                                    </span>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}