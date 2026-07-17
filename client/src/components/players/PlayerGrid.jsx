import EmptyPlayers from "./EmptyPlayers";
import PlayerCard from "./PlayerCard";

export default function PlayerGrid({

    players,

    loading

}) {

    if (loading) {

        return (

            <p className="text-gray-400">

                Loading players...

            </p>

        );

    }

    if (!players.length) {

        return <EmptyPlayers />;

    }

    return (

        <div
            className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
            "
        >

            {

                players.map(player => (

                    <PlayerCard

                        key={player._id}

                        player={player}

                    />

                ))

            }

        </div>

    );

}