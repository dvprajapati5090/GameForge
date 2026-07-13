const updateTournamentStatus = async (tournament) => {

    const now = new Date();

    let newStatus = tournament.status;

    if (tournament.status === "COMPLETED") {
        return tournament;
    }

    if (now < tournament.registrationStart) {

        newStatus = "DRAFT";

    } else if (
        now >= tournament.registrationStart &&
        now < tournament.registrationEnd
    ) {

        newStatus = "REGISTRATION_OPEN";

    } else if (
        now >= tournament.registrationEnd &&
        now < tournament.tournamentStart
    ) {

        newStatus = "REGISTRATION_CLOSED";

    } else if (
        now >= tournament.tournamentStart
    ) {

        newStatus = "LIVE";

    }

    if (newStatus !== tournament.status) {

        tournament.status = newStatus;

        await tournament.save();

    }

    return tournament;

};

export default updateTournamentStatus;