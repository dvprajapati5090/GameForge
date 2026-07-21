export default function RegistrationProgress({
    registered,
    maxTeams
}) {

    const percentage = Math.min(
        (registered / maxTeams) * 100,
        100
    );

    return (

        <div className="space-y-2">

            <div className="flex justify-between text-sm text-gray-400">

                <span>
                    {registered} / {maxTeams} Teams
                </span>

                <span>
                    {Math.round(percentage)}%
                </span>

            </div>

            <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                <div
                    style={{
                        width: `${percentage}%`
                    }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                />

            </div>

        </div>

    );

}