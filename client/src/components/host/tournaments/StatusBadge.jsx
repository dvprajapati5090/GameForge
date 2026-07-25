const colors = {
    DRAFT:
        "border border-slate-500/30 bg-slate-500/10 text-slate-300",

    REGISTRATION_OPEN:
        "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",

    LIVE:
        "border border-red-500/30 bg-red-500/10 text-red-300",

    COMPLETED:
        "border border-violet-500/30 bg-violet-500/10 text-violet-300",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1.5
                text-[11px]
                font-semibold
                tracking-wide
                backdrop-blur-xl
                ${colors[status]}
            `}
        >
            {status.replaceAll("_", " ")}
        </span>
    );
}