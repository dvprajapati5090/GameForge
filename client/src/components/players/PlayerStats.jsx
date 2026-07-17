import RankBadge from "./RankBadge";

export default function PlayerStats({

    player

}) {

    return (

        <div className="grid grid-cols-2 gap-5">

            <Stat

                title="Current Rank"

                value={

                    <RankBadge

                        rank={player.currentRank}

                    />

                }

            />

            <Stat

                title="Peak Rank"

                value={player.highestRank}

            />

            <Stat

                title="Level"

                value={player.accountLevel}

            />

            <Stat

                title="Team"

                value={
                    player.team?.name ||
                    "Free Agent"
                }

            />

        </div>

    );

}

function Stat({

    title,

    value

}) {

    return (

        <div>

            <p className="text-xs text-gray-500">

                {title}

            </p>

            <div className="mt-2 font-bold">

                {value}

            </div>

        </div>

    );

}