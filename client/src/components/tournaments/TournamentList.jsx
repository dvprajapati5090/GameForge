import TournamentCard from "./TournamentCard";

export default function TournamentList({

    tournaments

}) {

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

                tournaments.map(

                    tournament => (

                        <TournamentCard

                            key={tournament._id}

                            tournament={tournament}

                        />

                    )

                )

            }

        </div>

    );

}