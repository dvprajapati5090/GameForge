import MatchCard from "./MatchCard";

export default function BracketRound({

    round,

    matches

}) {

    return (

        <div className="min-w-[320px]">

            <h2 className="text-3xl font-black mb-8">

                Round {round}

            </h2>

            <div

                className="

                    flex

                    flex-col

                    justify-around

                    min-h-[800px]

                    gap-20

                "

            >

                {matches.map(match=>(

                    <MatchCard

                        key={match._id}

                        match={match}

                    />

                ))}

            </div>

        </div>

    );

}