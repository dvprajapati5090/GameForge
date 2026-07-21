export default function TournamentStatusBadge({

    status

}) {

    const colors = {

        DRAFT:
            "bg-gray-700 text-gray-300",

        REGISTRATION_OPEN:
            "bg-green-500/20 text-green-400",

        REGISTRATION_CLOSED:
            "bg-yellow-500/20 text-yellow-400",

        LIVE:
            "bg-red-500/20 text-red-400",

        COMPLETED:
            "bg-cyan-500/20 text-cyan-400",

        CANCELLED:
            "bg-gray-500/20 text-gray-400"

    };

    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${colors[status]}
            `}
        >

            {status.replaceAll("_", " ")}

        </span>

    );

}