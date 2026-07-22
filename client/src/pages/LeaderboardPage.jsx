import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import useLeaderboard from "../hooks/useLeaderboard";

export default function LeaderboardPage() {

    const [search, setSearch] = useState("");

    const [sort, setSort] = useState("stats.wins");

    const {
        data,
        isLoading
    } = useLeaderboard({
        search,
        sort
    });

    if (isLoading) {

        return (
            <div className="flex justify-center items-center h-[70vh] text-xl">
                Loading...
            </div>
        );

    }

    const players = data.data.players;

    return (

        <div className="max-w-7xl mx-auto p-8">

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-5xl font-bold flex items-center gap-3">

                    🏆 Leaderboard

                </h1>

                <p className="text-gray-400 mt-2 text-lg">

                    Top players across all GameForge tournaments

                </p>

            </div>

            {/* Search & Sort */}

            <div className="flex items-end gap-4 mb-8">

                <input

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    placeholder="🔍 Search player by username or display name..."

                    className="
                        flex-1
                        h-14
                        px-5
                        rounded-xl
                        bg-[#1f2937]
                        border
                        border-white/10
                        focus:border-cyan-400
                        outline-none
                    "

                />

                <div className="flex flex-col w-56">

                    <label className="text-sm text-gray-400 mb-2">

                        Sort By

                    </label>

                    <select

                        value={sort}

                        onChange={(e) => setSort(e.target.value)}

                        className="
                            h-14
                            rounded-xl
                            bg-[#1f2937]
                            border
                            border-white/10
                            px-4
                            outline-none
                        "

                    >

                        <option value="stats.wins">Wins</option>

                        <option value="stats.losses">Losses</option>

                        <option value="stats.matchesPlayed">Matches</option>

                        <option value="stats.championships">Championships</option>

                        <option value="winRate">Win Rate</option>

                    </select>

                </div>

            </div>

            {/* Empty State */}

            {

                players.length === 0 && (

                    <div className="text-center py-20 text-gray-400 text-xl">

                        No players found.

                    </div>

                )

            }

            {

                players.length > 0 && (

                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">

                        <table className="w-full">

                            <thead className="bg-[#111827] uppercase text-sm text-gray-400">

                                <tr>

                                    <th className="py-5 w-20">#</th>

                                    <th className="text-left">PLAYER</th>

                                    <th className="text-center">RANK</th>

                                    <th className="text-center">W</th>

                                    <th className="text-center">L</th>

                                    <th className="text-center">WIN %</th>

                                    <th className="text-center">🏆</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    players.map((player) => (

                                        <tr

                                            key={player._id}

                                            className="
                                                h-24
                                                border-t
                                                border-white/10
                                                hover:bg-white/5
                                                hover:scale-[1.01]
                                                transition-all
                                                duration-200
                                            "

                                        >

                                            <td className="text-center text-2xl">

                                                {

                                                    player.rank === 1

                                                        ? "🏅"

                                                        : player.rank === 2

                                                            ? "🥈"

                                                            : player.rank === 3

                                                                ? "🥉"

                                                                : player.rank

                                                }

                                            </td>

                                            <td className="py-5 px-4">

                                                <Link

                                                    to={`/players/${player._id}`}

                                                    className="flex items-center gap-4"

                                                >

                                                    {

                                                        player.avatar ? (

                                                            <img

                                                                src={player.avatar}

                                                                alt={player.displayName}

                                                                className="
                                                                    w-12
                                                                    h-12
                                                                    rounded-full
                                                                    object-cover
                                                                    border
                                                                    border-white/10
                                                                "

                                                            />

                                                        ) : (

                                                            <div

                                                                className="
                                                                    w-12
                                                                    h-12
                                                                    rounded-full
                                                                    bg-gradient-to-br
                                                                    from-cyan-500
                                                                    to-purple-600
                                                                    shadow-lg
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    font-bold
                                                                    text-lg
                                                                "

                                                            >

                                                                {

                                                                    player.displayName

                                                                        .charAt(0)

                                                                        .toUpperCase()

                                                                }

                                                            </div>

                                                        )

                                                    }

                                                    <div className="flex flex-col">

                                                        <span className="font-semibold text-lg">

                                                            {player.displayName}

                                                        </span>

                                                        <span className="text-sm text-gray-400">

                                                            @{player.username}

                                                        </span>

                                                    </div>

                                                </Link>

                                            </td>

                                            <td className="text-center">

                                                <div className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-white/5
                                                    border
                                                    border-white/10
                                                ">

                                                    🛡️

                                                    <span>

                                                        {player.highestRank}

                                                    </span>

                                                </div>

                                            </td>

                                            <td className="text-center font-semibold">

                                                {player.stats.wins}

                                            </td>

                                            <td className="text-center font-semibold">

                                                {player.stats.losses}

                                            </td>

                                            <td className="text-center font-semibold">

                                                <span

                                                    className={clsx(

                                                        Number(player.winRate) >= 70 &&

                                                        "text-green-400",

                                                        Number(player.winRate) >= 40 &&

                                                            Number(player.winRate) < 70 &&

                                                            "text-yellow-400",

                                                        Number(player.winRate) < 40 &&

                                                        "text-red-400"

                                                    )}

                                                >

                                                    {player.winRate}%

                                                </span>

                                            </td>

                                            <td className="text-center font-semibold">

                                                {

                                                    player.stats.championships

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    );

}