import AchievementCard from "./AchievementCard";

import { ACHIEVEMENTS } from "../../constants/achievements";

export default function AchievementsSection({

    unlockedAchievements

}) {

    const unlockedCodes = unlockedAchievements.map(

        a => a.code

    );

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-3xl font-bold">

                    🏅 Achievements

                </h2>

                <p className="text-gray-400">

                    Unlock badges by competing in tournaments.

                </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                {

                    Object.entries(

                        ACHIEVEMENTS

                    ).map(

                        ([code, achievement]) => (

                            <AchievementCard

                                key={code}

                                achievement={achievement}

                                unlocked={

                                    unlockedCodes.includes(

                                        code

                                    )

                                }

                            />

                        )

                    )

                }

            </div>

        </div>

    );

}