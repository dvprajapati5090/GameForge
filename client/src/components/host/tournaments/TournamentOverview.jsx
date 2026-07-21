import StatusBadge from "./StatusBadge";

export default function TournamentOverview({ tournament }) {

    return (

        <div className="space-y-6">

            <div className="rounded-3xl bg-slate-900 p-8 border border-white/10">

                <div className="flex justify-between items-start">

                    <div>

                        <h2 className="text-3xl font-black">

                            {tournament.name}

                        </h2>

                        <p className="text-gray-400 mt-3">

                            {tournament.description || "No description"}

                        </p>

                    </div>

                    <StatusBadge
                        status={tournament.status}
                    />

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <InfoCard
                    title="Game"
                    value={tournament.game}
                />

                <InfoCard
                    title="Mode"
                    value={tournament.mode}
                />

                <InfoCard
                    title="Format"
                    value={tournament.format}
                />

                <InfoCard
                    title="Prize Pool"
                    value={`₹${tournament.prizePool}`}
                />

                <InfoCard
                    title="Registration Starts"
                    value={new Date(
                        tournament.registrationStart
                    ).toLocaleString()}
                />

                <InfoCard
                    title="Registration Ends"
                    value={new Date(
                        tournament.registrationEnd
                    ).toLocaleString()}
                />

                <InfoCard
                    title="Tournament Starts"
                    value={new Date(
                        tournament.tournamentStart
                    ).toLocaleString()}
                />

            </div>

        </div>

    );

}

function InfoCard({

    title,

    value

}) {

    return (

        <div className="rounded-2xl bg-slate-900 p-6 border border-white/10">

            <p className="text-gray-400">

                {title}

            </p>

            <h3 className="text-xl font-bold mt-2">

                {value}

            </h3>

        </div>

    );

}