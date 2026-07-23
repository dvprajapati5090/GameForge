import User from "../models/user.model.js";

export const generateUniqueUsername = async (email) => {

    const baseUsername = email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    let username = baseUsername;

    let counter = 1;

    while (await User.exists({ username })) {

        username = `${baseUsername}${counter}`;

        counter++;

    }

    return username;

};