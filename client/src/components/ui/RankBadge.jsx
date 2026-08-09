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
            return "from-[#e8003d] to-[#7a0020]";

        if (rank.includes("DIAMOND"))
            return "from-[#7a0020] to-[#e8003d]";

        if (rank.includes("ASCENDANT"))
            return "from-green-500 to-emerald-400";

        if (rank.includes("IMMORTAL"))
            return "from-pink-600 to-red-500";

        if (rank.includes("RADIANT"))
            return "from-red-500 to-yellow-400";

        return "from-[#e8003d] to-[#7a0020]";

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