import useAuthStore from "../../store/authStore";

export default function ProfileCard() {

    const user = useAuthStore((state) => state.user);

    return (

        <div
            className="
                rounded-3xl

                bg-white/5

                border
                border-white/10

                backdrop-blur-xl

                p-8

                max-w-xl
            "
        >

            <h2 className="text-2xl font-bold mb-6">
                Riot Profile
            </h2>

            <div className="space-y-3">

                <Info title="Display Name" value={user.displayName} />

                <Info
                    title="Rank"
                    value={user.currentRank || "Unranked"}
                />

                <Info
                    title="Level"
                    value={user.accountLevel}
                />

                <Info
                    title="Region"
                    value={user.region?.toUpperCase()}
                />

                <Info
                    title="RR"
                    value={user.rankRating}
                />

            </div>

        </div>

    );

}

function Info({ title, value }) {

    return (

        <div className="flex justify-between">

            <span className="text-gray-400">
                {title}
            </span>

            <span className="font-semibold">
                {value}
            </span>

        </div>

    );

}