import { Quote, User } from "lucide-react";
import useAuthStore from "../../store/authStore";

import GlowCard from "../ui/GlowCard";

export default function AboutMe() {

    const user = useAuthStore((state) => state.user);

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
                    bg-purple-500/10
                    blur-3xl
                "
            />

            <div className="relative z-10">

                <div className="flex items-center gap-3 mb-6">

                    <User className="text-cyan-400" />

                    <h2 className="text-2xl font-black">

                        About Me

                    </h2>

                </div>

                <Quote
                    className="text-cyan-400/40 mb-4"
                    size={34}
                />

                <p
                    className="
                        text-gray-300
                        leading-8
                        text-lg
                        min-h-[110px]
                    "
                >

                    {

                        user?.bio ||

                        "No bio added yet. Tell the community about yourself."

                    }

                </p>

                <div
                    className="
                        mt-6
                        pt-6
                        border-t
                        border-white/10
                        flex
                        items-center
                        justify-between
                        text-sm
                        text-gray-400
                    "
                >

                    <span>

                        Joined GameForge

                    </span>

                    <span>

                        2026

                    </span>

                </div>

            </div>

        </GlowCard>

    );

}