import { Pencil, RefreshCw } from "lucide-react";

import { useState } from "react";

import EditProfileModal from "./EditProfileModal";

import useSyncRiot from "../../hooks/useSyncRiot";

import GradientButton from "../ui/GradientButton";

import useAuthStore from "../../store/authStore";

export default function HeroActions({player}) {

    const [open, setOpen] = useState(false);

    const syncMutation = useSyncRiot();

    const user = useAuthStore((state) => state.user);

    const isOwnProfile =
        !player || player.username === user?.username;

    if (!isOwnProfile) {

        return (

            <div className="flex justify-center mt-10">

                <GradientButton>

                    Invite to Team

                </GradientButton>

            </div>

        );

    }

    return (

        <>

            <div
                className="
                    flex
                    flex-wrap
                    justify-center
                    gap-5
                    mt-10
                "
            >

                <GradientButton

                    onClick={() => setOpen(true)}

                    className="
                        flex
                        items-center
                        gap-3
                    "

                >

                    <Pencil size={18} />

                    Edit Profile

                </GradientButton>

                <button

                    onClick={() => syncMutation.mutate()}

                    disabled={syncMutation.isPending}

                    className="
                        group
                        flex
                        items-center
                        gap-3
                        px-7
                        py-3
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-gradient-to-r
                        from-slate-900
                        to-slate-800
                        hover:border-cyan-400
                        hover:shadow-[0_0_25px_rgba(6,182,212,.18)]
                        transition-all
                        duration-300
                        disabled:opacity-60
                    "

                >

                    <RefreshCw

                        size={18}

                        className={`
                            ${syncMutation.isPending ? "animate-spin" : ""}
                            group-hover:text-cyan-400
                            transition-colors
                        `}

                    />

                    {

                        syncMutation.isPending

                            ? "Syncing..."

                            : "Sync Riot"

                    }

                </button>

            </div>

            <EditProfileModal

                open={open}

                onClose={() => setOpen(false)}

            />

        </>

    );

}