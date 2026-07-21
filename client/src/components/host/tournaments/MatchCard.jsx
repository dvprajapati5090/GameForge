import Button from "../../ui/Button";
import useUpdateMatch from "../../../hooks/useUpdateMatch";

export default function MatchCard({ match }) {

    const mutation = useUpdateMatch(match.tournament);

    return (

        <div className="bg-slate-900 rounded-2xl p-5 mb-6">

            <TeamRow team={match.teamA} />

            <div className="my-3 text-center">
                VS
            </div>

            <TeamRow team={match.teamB} />

            {!match.completed && (

                <div className="mt-5 flex gap-2">

                    <Button
                        onClick={() =>
                            mutation.mutate({
                                matchId: match._id,
                                winnerTeamId: match.teamA?._id
                            })
                        }
                    >
                        Team A Won
                    </Button>

                    <Button
                        onClick={() =>
                            mutation.mutate({
                                matchId: match._id,
                                winnerTeamId: match.teamB?._id
                            })
                        }
                    >
                        Team B Won
                    </Button>

                </div>

            )}

            {match.completed && (

                <p className="mt-5 text-green-400 font-bold">
                    Winner: {match.winner?.name}
                </p>

            )}

        </div>

    );

}

function TeamRow({ team }) {

    return (

        <div className="flex items-center gap-3">

            <img
                src={team?.logo || "https://placehold.co/50"}
                alt=""
                className="w-10 h-10 rounded-full"
            />

            <span>{team?.name || "BYE"}</span>

        </div>

    );

}