import { BadgeCheck } from "lucide-react";
import useAuthStore from "../../store/authStore";

export default function RiotIdentityCard() {

    const user = useAuthStore((state) => state.user);

    if (!user?.riotGameName)
        return null;

    return (

        <div
            className="
                mt-6
                mx-auto
                max-w-md
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                px-6
                py-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/30
                hover:bg-white/10
            "
        >

            <div className="flex items-center justify-between">

                <span className="text-xs uppercase tracking-[0.25em] text-gray-400">

                    Riot ID

                </span>

                {

                    user.riotVerified && (

                        <div className="flex items-center gap-2 text-emerald-400">

                            <BadgeCheck size={16} />

                            <span className="text-sm font-semibold">

                                Verified

                            </span>

                        </div>

                    )

                }

            </div>

            <div className="mt-4 flex items-center justify-center gap-3">

                <span className="text-xl font-bold text-white">

                    {user.riotGameName}

                </span>

                <span className="text-xl font-bold text-red-400">

                    #{user.riotTagLine}

                </span>

            </div>

        </div>

    );

}