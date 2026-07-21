import useTournaments from "../hooks/useTournaments";
import useHostTournaments from "../hooks/useHostTournaments";

import HostTournamentCard from "../components/host/tournaments/HostTournamentCard";

export default function HostTournamentsPage() {

    const { data, isLoading } = useHostTournaments();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No tournaments found.</div>;
    }

    const tournaments = data.data.tournaments;

    return (

        <div className="grid gap-6">

            {tournaments.map((tournament) => (

                <HostTournamentCard
                    key={tournament._id}
                    tournament={tournament}
                />

            ))}

        </div>

    );

}