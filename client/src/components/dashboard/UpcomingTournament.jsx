import { CalendarDays, Users, ChevronRight } from "lucide-react";

export default function UpcomingTournament({ tournament }) {

    return (

        <div
            className="
                group
                relative
                overflow-hidden

                rounded-2xl

                border
                border-white/10

                bg-gradient-to-r
                from-white/5
                via-white/[0.03]
                to-transparent

                backdrop-blur-xl

                p-5

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-violet-400/25
                hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]
            "
        >

            {/* Hover Glow */}

            <div
                className="
                    absolute
                    inset-0

                    bg-gradient-to-r
                    from-violet-500/5
                    via-transparent
                    to-fuchsia-500/5

                    opacity-0

                    transition-all
                    duration-300

                    group-hover:opacity-100
                "
            />

            <div className="relative z-10 flex items-center justify-between">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center

                            rounded-2xl

                            border
                            border-violet-500/20

                            bg-violet-500/10

                            text-xl
                            font-black
                            text-violet-300
                        "
                    >
                        {tournament.game.charAt(0)}
                    </div>

                    <div>

                        <h3
                            className="
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            {tournament.title}
                        </h3>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-400
                            "
                        >
                            {tournament.game}
                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-8">

                    <div className="text-right">

                        <div className="flex items-center justify-end gap-2">

                            <CalendarDays
                                size={14}
                                className="text-violet-300"
                            />

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-violet-300
                                "
                            >
                                {tournament.date}
                            </span>

                        </div>

                        <div
                            className="
                                mt-2
                                flex
                                items-center
                                justify-end
                                gap-2

                                text-sm
                                text-slate-400
                            "
                        >

                            <Users size={14} />

                            {tournament.teams} Teams

                        </div>

                    </div>

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center

                            rounded-full

                            bg-white/5

                            transition-all
                            duration-300

                            group-hover:bg-violet-500/10
                            group-hover:translate-x-1
                        "
                    >

                        <ChevronRight
                            size={18}
                            className="text-slate-400 group-hover:text-violet-300"
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}