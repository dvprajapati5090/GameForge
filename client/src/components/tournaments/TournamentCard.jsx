import { Calendar, Clock, Trophy, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../host/tournaments/StatusBadge";

export default function TournamentCard({ tournament }) {
    const navigate = useNavigate();

    const registered = tournament.registrationCount ?? tournament.registeredTeams?.length ?? 0;
    const progress = Math.min((registered / tournament.maxTeams) * 100, 100);

    const startsIn = getStartsIn(tournament.tournamentStart);

    return (
        <div
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
            {/* Banner */}
            <div className="relative h-40 overflow-hidden">
                {tournament.banner ? (
                    <img
                        src={tournament.banner}
                        alt={tournament.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-700" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {tournament.game}
                    </span>
                    <StatusBadge status={tournament.status} />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <h3 className="line-clamp-2 text-xl font-black text-white">
                        {tournament.name}
                    </h3>
                    <div className="text-right">
                        <div className="text-xs text-cyan-100">Prize Pool</div>
                        <div className="text-lg font-black text-cyan-300">
                            ₹{Number(tournament.prizePool || 0).toLocaleString("en-IN")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <p className="line-clamp-2 min-h-[2.5rem] text-sm text-gray-400">
                    {tournament.description || "No description provided."}
                </p>

                {/* Progress */}
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-gray-300">Registration</span>
                        <span className="font-semibold text-white">
                            {registered}/{tournament.maxTeams}
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                    <Stat
                        icon={<Users size={16} />}
                        label="Teams"
                        value={`${tournament.maxTeams}`}
                    />
                    <Stat
                        icon={<Trophy size={16} />}
                        label="Format"
                        value={shortFormat(tournament.format)}
                    />
                    <Stat
                        icon={<Clock size={16} />}
                        label="Starts"
                        value={startsIn}
                    />
                </div>

                {/* Dates */}
                <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={16} />
                    <span>
                        {new Date(tournament.tournamentStart).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })}
                    </span>
                </div>

                {/* CTA */}
                <button
                    onClick={() => navigate(`/tournaments/${tournament._id}`)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:brightness-110"
                >
                    View Tournament
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

function Stat({ icon, label, value }) {
    return (
        <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-3">
            <div className="flex items-center gap-2 text-cyan-400">
                {icon}
                <span className="text-xs font-medium">{label}</span>
            </div>
            <div className="mt-2 text-sm font-bold text-white">{value}</div>
        </div>
    );
}

function shortFormat(format = "") {
    return format === "SINGLE_ELIMINATION"
        ? "Single Elim"
        : format === "DOUBLE_ELIMINATION"
        ? "Double Elim"
        : format;
}

function getStartsIn(date) {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Live/Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
}