export const teamDetailsQuery = (query) => {

    return query
        .populate(
            "captain",
            `
            username
            displayName
            avatar
            riotCard
            riotVerified
            `
        )
        .populate(
            "members",
            `
            username
            displayName
            avatar
            preferredRole
            currentRank
            riotCard
            riotVerified
            `
        )
        .select("-createdBy -__v");

};