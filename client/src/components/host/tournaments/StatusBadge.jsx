import { Activity } from "lucide-react";

const colors = {
    DRAFT:
        "border-slate-500/30 bg-slate-500/10 text-slate-300",

    REGISTRATION_OPEN:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",

    LIVE:
        "border-red-500/30 bg-red-500/10 text-red-300",

    COMPLETED:
        "border-violet-500/30 bg-violet-500/10 text-violet-300",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                px-4
                py-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[2px]
                backdrop-blur-xl
                shadow-lg
                transition-all
                duration-300
                ${colors[status]}
            `}
        >
            <Activity size={12} />

            {status.replaceAll("_", " ")}
        </span>
    );
}