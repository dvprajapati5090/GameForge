export default function RegistrationProgress({
    registered,
    maxTeams,
}) {
    const percentage = Math.min(
        (registered / maxTeams) * 100,
        100
    );

    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-violet-500/20
                bg-white/5
                p-6
                backdrop-blur-2xl
            "
        >
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-violet-600/10
                    via-transparent
                    to-fuchsia-600/10
                "
            />

            <div
                className="
                    absolute
                    right-0
                    top-0
                    h-40
                    w-40
                    rounded-full
                    bg-violet-600/10
                    blur-[90px]
                "
            />

            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-[3px]
                                text-slate-500
                            "
                        >
                            Registration Progress
                        </p>

                        <h3
                            className="
                                mt-2
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            Team Registration Status
                        </h3>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            px-5
                            py-3
                        "
                    >
                        <span
                            className="
                                text-lg
                                font-bold
                                text-violet-300
                            "
                        >
                            {registered}
                        </span>

                        <span className="mx-2 text-slate-500">
                            /
                        </span>

                        <span className="text-white">
                            {maxTeams}
                        </span>
                    </div>
                </div>

                <div className="mt-8">
                    <div
                        className="
                            relative
                            h-4
                            overflow-hidden
                            rounded-full
                            border
                            border-white/5
                            bg-[#0B1020]
                        "
                    >
                        <div
                            style={{
                                width: `${percentage}%`,
                            }}
                            className="
                                relative
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-violet-500
                                via-fuchsia-500
                                to-indigo-500
                                transition-all
                                duration-700
                            "
                        >
                            <div
                                className="
                                    absolute
                                    inset-0
                                    animate-pulse
                                    bg-white/10
                                "
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="
                        mt-6
                        grid
                        gap-4
                        md:grid-cols-3
                    "
                >
                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-4
                        "
                    >
                        <p className="text-xs text-slate-500">
                            Completion
                        </p>

                        <h4 className="mt-2 text-xl font-bold text-white">
                            {Math.round(percentage)}%
                        </h4>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-4
                        "
                    >
                        <p className="text-xs text-slate-500">
                            Registered
                        </p>

                        <h4 className="mt-2 text-xl font-bold text-white">
                            {registered}
                        </h4>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-4
                        "
                    >
                        <p className="text-xs text-slate-500">
                            Remaining Slots
                        </p>

                        <h4 className="mt-2 text-xl font-bold text-violet-300">
                            {maxTeams - registered}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
