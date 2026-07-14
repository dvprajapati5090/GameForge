export default function RankBadge({

    rank

}) {

    const getColor = () => {

        if (!rank)
            return "from-slate-700 to-slate-600";

        if (rank.includes("IRON"))
            return "from-gray-600 to-gray-400";

        if (rank.includes("BRONZE"))
            return "from-amber-700 to-amber-500";

        if (rank.includes("SILVER"))
            return "from-gray-300 to-slate-100";

        if (rank.includes("GOLD"))
            return "from-yellow-500 to-yellow-300";

        if (rank.includes("PLATINUM"))
            return "from-cyan-500 to-blue-500";

        if (rank.includes("DIAMOND"))
            return "from-indigo-500 to-purple-500";

        if (rank.includes("ASCENDANT"))
            return "from-green-500 to-emerald-400";

        if (rank.includes("IMMORTAL"))
            return "from-pink-600 to-red-500";

        if (rank.includes("RADIANT"))
            return "from-red-500 to-yellow-400";

        return "from-cyan-500 to-purple-600";

    };

    return (

        <div
            className={`
                px-6
                py-3
                rounded-full
                font-bold
                text-white
                bg-gradient-to-r
                ${getColor()}
            `}
        >

            🏆 {rank || "UNRANKED"}

        </div>

    );

}