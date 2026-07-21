import MatchCard from "./MatchCard";

export default function BracketRound({

    round,

    isHost

}) {

    return (

        <div className="w-80">

            <h2 className="text-2xl font-black mb-8">

                {round.title}

            </h2>

            <div className="space-y-10">

                {

                    round.matches.map(match => (

                        <MatchCard

                            key={match._id}

                            match={match}

                            isHost={isHost}

                        />

                    ))

                }

            </div>

        </div>

    );

}