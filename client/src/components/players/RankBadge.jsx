const rankColors = {

    "IRON": "bg-stone-700 text-stone-200",

    "BRONZE": "bg-orange-700 text-orange-100",

    "SILVER": "bg-slate-400 text-black",

    "GOLD": "bg-yellow-500 text-black",

    "PLATINUM": "bg-cyan-500 text-black",

    "DIAMOND": "bg-indigo-500 text-white",

    "ASCENDANT": "bg-emerald-500 text-white",

    "IMMORTAL": "bg-red-500 text-white",

    "RADIANT": "bg-yellow-300 text-black"

};

export default function RankBadge({

    rank = "UNRANKED"

}) {

    if (!rank || rank === "UNRANKED") {

        return (

            <span
                className="
                    px-3
                    py-1
                    rounded-full
                    bg-gray-700
                    text-gray-200
                    text-sm
                    font-semibold
                "
            >

                UNRANKED

            </span>

        );

    }

    const tier = rank.split(" ")[0];

    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-bold
                ${rankColors[tier] || "bg-gray-700 text-white"}
            `}
        >

            {rank}

        </span>

    );

}