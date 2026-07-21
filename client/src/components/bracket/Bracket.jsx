import BracketRound from "./BracketRound";

export default function Bracket({

    rounds,

    isHost = false

}) {

    return (

        <div className="overflow-x-auto">

            <div className="flex gap-12 min-w-max">

                {

                    rounds.map(round => (

                        <BracketRound

                            key={round.round}

                            round={round}

                            isHost={isHost}

                        />

                    ))

                }

            </div>

        </div>

    );

}