import HostMatchControls from "./HostMatchControls";

export default function MatchCard({ match }) {

    return (

        <div className="bg-[#111827] rounded-2xl border border-white/10 p-5 mb-8">

            <div className="text-xs text-cyan-400 mb-4 font-semibold">

                Match #{match.matchNumber}

            </div>

            {/* Team A */}

            <div className="flex justify-between items-center py-2">

                <span className="font-semibold">

                    {match.teamA?.name || "TBD"}

                </span>

                <span className="font-bold text-xl">

                    {match.scoreA ?? "-"}

                </span>

            </div>

            <div className="text-center text-gray-500 py-2">

                VS

            </div>

            {/* Team B */}

            <div className="flex justify-between items-center py-2">

                <span className="font-semibold">

                    {match.teamB?.name || "TBD"}

                </span>

                <span className="font-bold text-xl">

                    {match.scoreB ?? "-"}

                </span>

            </div>

            {
                match.status === "COMPLETED" && (

                    <div className="mt-4 rounded-lg bg-green-500/20 text-green-400 p-2 text-center font-semibold">

                        🏆 Winner: {match.winner?.name}

                    </div>

                )
            }

            {
                match.teamA &&
                match.teamB &&
                match.status !== "COMPLETED" && (

                    <HostMatchControls
                        match={match}
                    />

                )
            }

        </div>

    );

}