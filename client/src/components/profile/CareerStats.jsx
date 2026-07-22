import CareerStatCard from "./CareerStatCard";

export default function CareerStats({

    stats

}) {

    return (

        <div
            className="

                grid

                grid-cols-2

                lg:grid-cols-3

                gap-5

            "
        >

            <CareerStatCard

                icon="🎮"

                title="Matches"

                value={stats.matchesPlayed}

            />

            <CareerStatCard

                icon="✅"

                title="Wins"

                value={stats.wins}

            />

            <CareerStatCard

                icon="❌"

                title="Losses"

                value={stats.losses}

            />

            <CareerStatCard

                icon="🏆"

                title="Championships"

                value={stats.championships}

            />

            <CareerStatCard

                icon="🏅"

                title="Tournaments"

                value={stats.tournamentsPlayed}

            />

            <CareerStatCard

                icon="📈"

                title="Win Rate"

                value={`${stats.winRate}%`}

            />

        </div>

    );

}