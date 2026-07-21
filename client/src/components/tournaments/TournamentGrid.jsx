import TournamentCard from "./TournamentCard";

export default function TournamentGrid({ tournaments }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tournaments.map((tournament) => (
                <TournamentCard
                    key={tournament._id}
                    tournament={tournament}
                />
            ))}
        </div>
    );
}