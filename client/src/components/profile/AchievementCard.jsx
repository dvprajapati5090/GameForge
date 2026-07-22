import clsx from "clsx";

export default function AchievementCard({

    achievement,

    unlocked

}) {

    return (

        <div

            className={clsx(

                "rounded-2xl p-5 border transition-all duration-300",

                unlocked

                    ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-400 shadow-lg shadow-yellow-500/20"

                    : "bg-white/5 border-white/10 opacity-40"

            )}

        >

            <div className="text-5xl mb-4">

                {achievement.icon}

            </div>

            <h3 className="font-bold text-lg">

                {achievement.title}

            </h3>

            <p className="text-sm text-gray-400 mt-2">

                {achievement.description}

            </p>

            {

                unlocked && (

                    <div className="mt-4 text-green-400 text-sm font-semibold">

                        ✓ Unlocked

                    </div>

                )

            }

        </div>

    );

}