import clsx from "clsx";
import useAuthStore from "../../../store/authStore";

export default function BracketMatch({

    match,

    onWinner

}) {

    const user = useAuthStore((state) => state.user);

    const isHost = user?.role === "HOST";

    const TeamRow = ({

        team,

        isWinner,

        onClick,

        border = false

    }) => {

        if (isHost) {

            return (

                <button

                    disabled={
                        !team ||
                        match.status === "COMPLETED"
                    }

                    onClick={onClick}

                    className={clsx(

                        "w-full p-4 text-left transition",

                        border && "border-b border-white/10",

                        isWinner && "bg-green-600",

                        !team && "opacity-50 cursor-not-allowed"

                    )}

                >

                    {team?.name || "TBD"}

                </button>

            );

        }

        return (

            <div

                className={clsx(

                    "w-full p-4",

                    border && "border-b border-white/10",

                    isWinner && "bg-green-600"

                )}

            >

                {team?.name || "TBD"}

            </div>

        );

    };

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

            <TeamRow

                team={match.teamA}

                border

                isWinner={
                    match.winner === match.teamA?._id
                }

                onClick={() =>
                    onWinner?.(match.teamA?._id)
                }

            />

            <TeamRow

                team={match.teamB}

                isWinner={
                    match.winner === match.teamB?._id
                }

                onClick={() =>
                    onWinner?.(match.teamB?._id)
                }

            />

        </div>

    );

}