import { useState } from "react";
import Button from "../ui/Button";
import useUpdateMatch from "../../hooks/useUpdateMatch";
import useAuthStore from "../../store/authStore";

export default function HostMatchControls({ match }) {

    const user = useAuthStore((state) => state.user);

    const [winnerId, setWinnerId] = useState("");
    const [scoreA, setScoreA] = useState("");
    const [scoreB, setScoreB] = useState("");

    const { mutate, isPending } = useUpdateMatch();

    // Only hosts can see match controls
    if (user?.role !== "HOST") {
        return null;
    }

    const isCorrection = match.status === "COMPLETED";

    return (

        <div className="mt-5 border-t border-white/10 pt-4 space-y-4">

            {isCorrection && (
                <p style={{ fontSize: 11, color: "rgba(232,0,61,0.8)", fontWeight: 700, letterSpacing: "0.08em" }}>
                    ✏️ CORRECT RESULT
                </p>
            )}
            <div className="grid grid-cols-2 gap-3">

                <input
                    type="number"
                    placeholder="Team A Score"
                    value={scoreA}
                    onChange={(e) => setScoreA(e.target.value)}
                    className="bg-black border border-white/10 rounded-lg p-2"
                />

                <input
                    type="number"
                    placeholder="Team B Score"
                    value={scoreB}
                    onChange={(e) => setScoreB(e.target.value)}
                    className="bg-black border border-white/10 rounded-lg p-2"
                />

            </div>

            <div className="space-y-2">

                <label className="flex gap-2 items-center">

                    <input
                        type="radio"
                        value={match.teamA?._id}
                        checked={winnerId === match.teamA?._id}
                        onChange={(e) => setWinnerId(e.target.value)}
                    />

                    {match.teamA?.name}

                </label>

                <label className="flex gap-2 items-center">

                    <input
                        type="radio"
                        value={match.teamB?._id}
                        checked={winnerId === match.teamB?._id}
                        onChange={(e) => setWinnerId(e.target.value)}
                    />

                    {match.teamB?.name}

                </label>

            </div>

            <Button

                className="w-full"

                loading={isPending}

                onClick={() => {

                    mutate({

                        matchId: match._id,

                        winnerId,

                        scoreA: Number(scoreA),

                        scoreB: Number(scoreB)

                    });

                }}

            >

                Save Result

            </Button>

        </div>

    );

}