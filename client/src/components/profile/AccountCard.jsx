import GlowCard from "../ui/GlowCard";

import {
    ShieldCheck,
    Gamepad2,
    Trophy,
    Star,
    RefreshCw
} from "lucide-react";

import useAuthStore from "../../store/authStore";
import useSyncRiot from "../../hooks/useSyncRiot";

export default function AccountCard() {

    const user = useAuthStore((state) => state.user);

    const syncMutation = useSyncRiot();

    return (

        <GlowCard

            className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-slate-900
                via-slate-900
                to-[#12243d]
                p-8
            "

        >

            <div
                className="
                    absolute
                    -top-20
                    -right-20
                    w-56
                    h-56
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                "
            />

            <h2 className="text-2xl font-black">

                Riot Account

            </h2>

            {

                user?.riotVerified ? (

                    <>

                        <div className="flex items-center gap-2 mt-5">

                            <ShieldCheck
                                className="text-emerald-400"
                                size={22}
                            />

                            <span className="text-emerald-400 font-semibold">

                                Verified

                            </span>

                        </div>

                        <div className="mt-8">

                            <p className="text-gray-400">

                                Riot ID

                            </p>

                            <h2 className="text-3xl font-black mt-2 flex items-center gap-2">

                                <span>

                                    {user.riotGameName}

                                </span>

                                <span className="text-red-400">

                                    #{user.riotTagLine}

                                </span>

                            </h2>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">

                            <MiniCard

                                icon={<Trophy className="text-yellow-400" />}

                                label="Current Rank"

                                value={user.currentRank || "UNRANKED"}

                            />

                            <MiniCard

                                icon={<Star className="text-cyan-400" />}

                                label="Peak Rank"

                                value={user.highestRank || "N/A"}

                            />

                            <MiniCard

                                icon={<Gamepad2 className="text-purple-400" />}

                                label="Level"

                                value={user.accountLevel}

                            />

                            <MiniCard

                                icon={<RefreshCw className="text-emerald-400" />}

                                label="RR"

                                value={user.rankRating}

                            />

                        </div>

                        <button

                            onClick={() => syncMutation.mutate()}

                            className="
                                w-full
                                mt-8
                                rounded-xl
                                py-3
                                bg-gradient-to-r
                                from-cyan-500
                                to-purple-600
                                font-semibold
                                hover:scale-[1.02]
                                transition
                            "

                        >

                            {

                                syncMutation.isPending

                                    ? "Syncing..."

                                    : "Sync Riot Profile"

                            }

                        </button>

                    </>

                ) : (

                    <>

                        <p className="text-gray-400 mt-5">

                            Connect your Riot account to unlock
                            statistics, ranks and tournament verification.

                        </p>

                        <button

                            className="
                                mt-8
                                w-full
                                rounded-xl
                                py-3
                                bg-cyan-500
                                hover:bg-cyan-400
                                transition
                            "

                        >

                            Connect Riot Account

                        </button>

                    </>

                )

            }

        </GlowCard>

    );

}

function MiniCard({

    icon,

    label,

    value

}) {

    return (

        <GlowCard className="rounded-2xl p-4 h-full">

            <div className="mb-3">

                {icon}

            </div>

            <p className="text-gray-400 text-sm">

                {label}

            </p>

            <h3 className="font-bold text-lg mt-1">

                {value}

            </h3>

        </GlowCard>

    );

}