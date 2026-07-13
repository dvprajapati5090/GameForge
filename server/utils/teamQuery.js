export const teamDetailsQuery = (query) => {

    return query
        .populate(
            "captain",
            "username displayName avatar"
        )
        .populate(
            "members",
            "username displayName avatar preferredRole currentRank"
        )
        .select("-createdBy -__v");

};