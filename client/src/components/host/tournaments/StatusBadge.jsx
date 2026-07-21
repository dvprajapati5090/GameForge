const colors = {

    DRAFT:
        "bg-gray-700 text-gray-300",

    REGISTRATION_OPEN:
        "bg-emerald-500/20 text-emerald-400",

    LIVE:
        "bg-red-500/20 text-red-400",

    COMPLETED:
        "bg-cyan-500/20 text-cyan-400"

};

export default function StatusBadge({
    status
}) {

    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                ${colors[status]}
            `}
        >

            {status.replaceAll("_", " ")}

        </span>

    );

}