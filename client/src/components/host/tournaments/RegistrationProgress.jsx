export default function RegistrationProgress({
    registered,
    maxTeams,
}) {
    const percentage = Math.min(
        (registered / maxTeams) * 100,
        100
    );

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                    Registration Progress
                </span>

                <span
                    className="
                        rounded-full
                        border
                        border-violet-500/20
                        bg-violet-500/10
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-violet-300
                    "
                >
                    {registered} / {maxTeams}
                </span>
            </div>

            <div
                className="
                    h-3
                    overflow-hidden
                    rounded-full
                    bg-white/5
                "
            >
                <div
                    style={{
                        width: `${percentage}%`,
                    }}
                    className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-violet-500
                        via-fuchsia-500
                        to-indigo-500
                        transition-all
                        duration-500
                    "
                />
            </div>

            <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                    {Math.round(percentage)}% Filled
                </span>

                <span className="font-medium text-violet-300">
                    {maxTeams - registered} Slots Left
                </span>
            </div>
        </div>
    );
}