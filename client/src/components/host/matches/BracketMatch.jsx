import clsx from "clsx";

export default function BracketMatch({

    match,

    onWinner

}) {

    return (

        <div
            className="
                w-64
                rounded-2xl
                bg-slate-900
                border
                border-white/10
                overflow-hidden
            "
        >

            <button

                disabled={
                    !match.teamA ||
                    match.status === "COMPLETED"
                }

                onClick={() =>
                    onWinner(match.teamA?._id)
                }

                className={clsx(

                    "w-full p-4 text-left border-b border-white/10",

                    match.winner === match.teamA?._id &&
                    "bg-green-600"

                )}

            >

                {match.teamA?.name || "TBD"}

            </button>

            <button

                disabled={
                    !match.teamB ||
                    match.status === "COMPLETED"
                }

                onClick={() =>
                    onWinner(match.teamB?._id)
                }

                className={clsx(

                    "w-full p-4 text-left",

                    match.winner === match.teamB?._id &&
                    "bg-green-600"

                )}

            >

                {match.teamB?.name || "TBD"}

            </button>

        </div>

    );

}