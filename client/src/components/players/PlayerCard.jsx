import GlowCard from "../ui/GlowCard";
import PlayerAvatar from "./PlayerAvatar";
import PlayerStats from "./PlayerStats";
import PlayerActions from "./PlayerActions";

export default function PlayerCard({ player }) {
    
    console.log(player.displayName);
    console.log(player.riotCard);

    const riotCardUrl = player.riotCard
        ? `https://media.valorant-api.com/playercards/${player.riotCard}/wideart.png`
        : "";

console.log(riotCardUrl);

    return (

        <GlowCard className="overflow-hidden">

            <div className="relative">

                <div className="h-40">

                    <img
                        src={riotCardUrl}
                        alt="Riot Card"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                </div>

                <div className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 z-10">

                    <PlayerAvatar player={player} />

                </div>

            </div>

            <div className="px-6 pt-16 pb-6">

                <div className="text-center">

                    <h2 className="text-2xl font-black">
                        {player.displayName}
                    </h2>

                    <p className="text-gray-400">
                        {player.riotGameName}#{player.riotTagLine}
                    </p>

                </div>

                <div className="mt-8">
                    <PlayerStats player={player} />
                </div>

                <div className="mt-8">
                    <PlayerActions player={player} />
                </div>

            </div>

        </GlowCard>

    );

}