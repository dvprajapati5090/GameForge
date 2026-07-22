import Achievement from "../models/achievement.model.js";

import { ACHIEVEMENTS, ACHIEVEMENT_INFO } from "../constants/achievement.constants.js";

import { createNotification } from "./notification.service.js";

export const unlockAchievement = async (
    userId,
    code
) => {

    console.log("Trying to unlock:", code);

    const exists = await Achievement.findOne({

        user: userId,

        code

    });

    if (exists) {

        console.log("Already unlocked");

        return;

    }

    console.log("Creating achievement");

    await Achievement.create({

        user: userId,

        code

    });

    console.log("Achievement created");

    try {

        console.log("Achievement info:", ACHIEVEMENT_INFO[code]);

        const notification = await createNotification(

            userId,

            "Achievement Unlocked",

            `🏆 ${ACHIEVEMENT_INFO[code].title}`,

            "ACHIEVEMENT",

            "/profile"

        );

        console.log("Notification created:", notification);

    } catch (err) {

        console.error("Notification Error:");

        console.error(err);

    }

};

export const getPlayerAchievements = async (

    userId

) => {

    return await Achievement.find({

        user: userId

    }).sort({

        unlockedAt: -1

    });

};

export const checkPlayerAchievements = async (

    player

) => {

    console.log(
        "Checking achievements for:",
        player.username,
        player.stats
    );

    if (

        player.stats.wins >= 1

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.FIRST_WIN

        );

    }

    if (

        player.stats.wins >= 10

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.TEN_WINS

        );

    }

    if (

        player.stats.wins >= 25

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.TWENTY_FIVE_WINS

        );

    }

    if (

        player.stats.wins >= 50

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.FIFTY_WINS

        );

    }

    if (

        player.stats.wins >= 100

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.HUNDRED_WINS

        );

    }

    if (

        player.stats.matchesPlayed >= 10

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.TEN_MATCHES

        );

    }

    if (

        player.stats.matchesPlayed >= 50

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.FIFTY_MATCHES

        );

    }

    if (

        player.stats.matchesPlayed >= 100

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.HUNDRED_MATCHES

        );

    }

    if (

        player.stats.tournamentsPlayed >= 1

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.FIRST_TOURNAMENT

        );

    }

    if (

        player.stats.tournamentsPlayed >= 10

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.TEN_TOURNAMENTS

        );

    }

    if (

        player.stats.championships >= 1

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.FIRST_CHAMPIONSHIP

        );

    }

    if (

        player.stats.championships >= 3

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.THREE_CHAMPIONSHIPS

        );

    }

    if (

        player.stats.championships >= 5

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.FIVE_CHAMPIONSHIPS

        );

    }

    if (

        player.riotVerified

    ) {

        await unlockAchievement(

            player._id,

            ACHIEVEMENTS.RIOT_VERIFIED

        );

    }

};
