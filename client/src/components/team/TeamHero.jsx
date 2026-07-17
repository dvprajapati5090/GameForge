import { Shield, Crown, Users, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamHero({ team }) {

    const createdDate = new Date(team.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.45
            }}

            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-slate-900
                via-slate-900
                to-[#132238]
                p-10
            "

        >

            <div
                className="
                    absolute
                    -top-24
                    -right-24
                    w-72
                    h-72
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -bottom-20
                    -left-20
                    w-72
                    h-72
                    rounded-full
                    bg-purple-500/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    lg:flex-row
                    items-center
                    justify-between
                    gap-10
                "
            >

                <div className="flex items-center gap-8">

                    <div
                        className="
                            w-28
                            h-28
                            rounded-3xl
                            bg-gradient-to-br
                            from-cyan-500
                            to-purple-600
                            flex
                            items-center
                            justify-center
                            shadow-[0_0_35px_rgba(6,182,212,0.35)]
                        "
                    >

                        <Shield size={54} />

                    </div>

                    <div>

                        <p
                            className="
                                uppercase
                                tracking-[0.35em]
                                text-cyan-400
                                text-xs
                                font-bold
                            "
                        >

                            Esports Team

                        </p>

                        <h1
                            className="
                                mt-2
                                text-5xl
                                font-black
                            "
                        >

                            {team.name}

                        </h1>

                        <p
                            className="
                                mt-3
                                text-gray-400
                                text-lg
                                max-w-xl
                            "
                        >

                            {
                                team.description ||

                                "No description added."
                            }

                        </p>

                    </div>

                </div>

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                    "
                >

                    <InfoChip
                        icon={<Crown size={18} />}
                        label="Captain"
                        value={team.captain.displayName}
                    />

                    <InfoChip
                        icon={<Users size={18} />}
                        label="Members"
                        value={`${team.members.length}/${team.maxMembers}`}
                    />

                    <InfoChip
                        icon={<CalendarDays size={18} />}
                        label="Created"
                        value={createdDate}
                    />

                </div>

            </div>

        </motion.div>

    );

}

function InfoChip({

    icon,

    label,

    value

}) {

    return (

        <div
            className="
                min-w-[170px]
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-5
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-cyan-400
                "
            >

                {icon}

                <span className="text-sm">

                    {label}

                </span>

            </div>

            <h3
                className="
                    mt-3
                    text-lg
                    font-bold
                "
            >

                {value}

            </h3>

        </div>

    );

}