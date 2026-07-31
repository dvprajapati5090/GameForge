import GlowCard from "../ui/GlowCard";
import PlayerAvatar from "./PlayerAvatar";
import PlayerStats from "./PlayerStats";
import PlayerActions from "./PlayerActions";

export default function PlayerCard({ player }) {

    const riotCardUrl = player.riotCard
        ? `https://media.valorant-api.com/playercards/${player.riotCard}/wideart.png`
        : "";

    return (

        <GlowCard
            className="
                group
                w-full
                max-w-[370px]
                mx-auto
                overflow-hidden
                rounded-[26px]
                border
                border-violet-500/15
                bg-[#121827]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-violet-400/40
                hover:shadow-[0_25px_60px_rgba(139,92,246,.18)]
            "
        >

            <div className="relative">

                <div className="relative h-40 overflow-hidden">

                    <img
                        src={riotCardUrl}
                        alt="Riot Card"
                        className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                        "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#121827] via-[#121827]/20 to-transparent" />

                </div>

                <div
                    className="
                        absolute
                        left-1/2
                        top-40
                        -translate-x-1/2
                        -translate-y-1/2
                        z-20
                    "
                >

                    <PlayerAvatar player={player} />

                </div>

                <div className="px-6 pt-12 pb-6">

                    <div className="text-center">

                        <h2 className="text-[2rem] font-black text-white leading-none">

                            {player.displayName}

                        </h2>

                        <p className="mt-2 text-base text-slate-400">

                            {player.riotGameName}
                            <span className="text-cyan-300">
                                #{player.riotTagLine}
                            </span>

                        </p>

                    </div>

                    <div className="mt-8">
                                                <div
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.03]
                                py-4 px-5
                                backdrop-blur-xl
                            "
                        >

                            <PlayerStats player={player} />

                        </div>

                    </div>

                    <div className="mt-4">

                        <PlayerActions player={player} />

                    </div>

                </div>

            </div>

        </GlowCard>

    );

}