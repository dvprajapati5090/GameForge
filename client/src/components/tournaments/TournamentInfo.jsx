export default function TournamentInfo({

    tournament

}) {

    return (

        <div className="grid md:grid-cols-3 gap-6">

            <InfoCard

                title="Organizer"

                value={tournament.organizer.displayName}

            />

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

                title="Teams"

                value={`${tournament.registrationCount}/${tournament.maxTeams}`}

            />

            <InfoCard

                title="Registration Ends"

                value={new Date(tournament.registrationEnd).toLocaleDateString()}

            />

        </div>

    );

}

function InfoCard({

    title,

    value

}) {

    return (

        <div className="bg-[#111827] rounded-xl p-5">

            <div className="text-gray-400">

                {title}

            </div>

            <div className="font-bold text-xl mt-2">

                {value}

            </div>

        </div>

    );

}