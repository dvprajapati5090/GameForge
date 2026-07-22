import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";

import User from "../models/user.model.js";

import { checkPlayerAchievements } from "../services/achievement.service.js";

await connectDB();

const players = await User.find().select("-password -refreshToken");

console.log(`Found ${players.length} players\n`);

for (const player of players) {

    await checkPlayerAchievements(player);

    console.log(`✔ Synced ${player.username}`);

}

console.log("\n✅ All achievements synchronized successfully.");

process.exit(0);