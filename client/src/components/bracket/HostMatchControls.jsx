import { useState } from "react";
import Button from "../ui/Button";
import useUpdateMatch from "../../hooks/useUpdateMatch";

export default function HostMatchControls({ match }) {

    const [winnerId, setWinnerId] = useState("");

    const [scoreA, setScoreA] = useState("");

    const [scoreB, setScoreB] = useState("");

    const { mutate, isPending } = useUpdateMatch();

    if (match.status === "COMPLETED") {

        return null;

    }

    return (

        <div className="mt-5 border-t border-white/10 pt-4 space-y-4">

            <div className="grid grid-cols-2 gap-3">

                <input

                    type="number"

                    placeholder="Team A Score"

                    value={scoreA}

                    onChange={(e)=>setScoreA(e.target.value)}

                    className="bg-[#1f2937] rounded-lg p-2"

                />

                <input

                    type="number"

                    placeholder="Team B Score"

                    value={scoreB}

                    onChange={(e)=>setScoreB(e.target.value)}

                    className="bg-[#1f2937] rounded-lg p-2"

                />

            </div>

            <div className="space-y-2">

                <label className="flex gap-2 items-center">

                    <input

                        type="radio"

                        value={match.teamA?._id}

                        checked={winnerId===match.teamA?._id}

                        onChange={(e)=>setWinnerId(e.target.value)}

                    />

                    {match.teamA?.name}

                </label>

                <label className="flex gap-2 items-center">

                    <input

                        type="radio"

                        value={match.teamB?._id}

                        checked={winnerId===match.teamB?._id}

                        onChange={(e)=>setWinnerId(e.target.value)}

                    />

                    {match.teamB?.name}

                </label>

            </div>

            <Button

                className="w-full"

                loading={isPending}

                onClick={() => {

                    console.log("SAVE CLICKED");

                    console.log({
                        matchId: match._id,
                        winnerId,
                        scoreA,
                        scoreB
                    });

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