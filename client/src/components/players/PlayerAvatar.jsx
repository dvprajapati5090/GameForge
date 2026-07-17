export default function PlayerAvatar({ player }) {

    const avatarUrl =
        player.avatar ||
        (player.riotCard
            ? `https://media.valorant-api.com/playercards/${player.riotCard}/smallart.png`
            : null);

    return (

        <img

            src={
                avatarUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    player.displayName
                )}&background=111827&color=06b6d4`
            }

            alt={player.displayName}

            className="
                w-24
                h-24
                rounded-full
                border-4
                border-cyan-400
                shadow-lg
                object-cover
                bg-slate-900
            "

            onError={(e) => {

                e.target.onerror = null;

                e.target.src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        player.displayName
                    )}&background=111827&color=06b6d4`;

            }}

        />

    );

}