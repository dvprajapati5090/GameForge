import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import useDebounce from "../hooks/useDebounce";

import useLeaderboard from "../hooks/useLeaderboard";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const [sort, setSort] = useState("stats.wins");

  const { data, isLoading } = useLeaderboard({
    search: debouncedSearch,
    sort,
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

      <div
        className="
        mb-8
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
    "
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
          {/* Search */}

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Search Player
            </label>

            <div className="relative">
              <span
                className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-xl
                        text-violet-300
                    "
              >
                🔍
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username or display name..."
                className="
                        w-full
                        h-16
                        rounded-2xl
                        pl-14
                        pr-5

                        bg-[#1a2233]

                        border
                        border-white/10

                        text-white
                        placeholder:text-gray-500

                        outline-none

                        transition-all
                        duration-300

                        focus:border-violet-500
                        focus:ring-4
                        focus:ring-violet-500/15
                        hover:border-violet-400/30
                    "
              />
            </div>
          </div>

          {/* Sort */}

          <div className="w-full lg:w-72">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Sort Leaderboard
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                    w-full
                    h-16

                    rounded-2xl

                    bg-[#1a2233]

                    border
                    border-white/10

                    px-5

                    text-white

                    outline-none

                    transition-all
                    duration-300

                    focus:border-violet-500
                    focus:ring-4
                    focus:ring-violet-500/15
                    hover:border-violet-400/30
                "
            >
              <option value="stats.wins">🏆 Wins</option>

              <option value="stats.losses">❌ Losses</option>

              <option value="stats.matchesPlayed">🎮 Matches Played</option>

              <option value="stats.championships">👑 Championships</option>

              <option value="winRate">📈 Win Rate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}

      {players.length === 0 && (
        <div
          className="
                rounded-3xl
                border
                border-dashed
                border-white/10
                bg-white/[0.03]
                py-20
                text-center
            "
        >
          <div className="text-6xl mb-5">🔍</div>

          <h2 className="text-2xl font-bold text-white">No Players Found</h2>

          <p className="mt-3 text-gray-400">
            Try changing your search or sorting criteria.
          </p>
        </div>
      )}

      {players.length === 0 && (
        <div className="text-center py-20 text-gray-400 text-xl">
          No players found.
        </div>
      )}

      {players.length > 0 && (
        <div
          className="
                overflow-hidden
                rounded-3xl

                border
                border-white/10

                bg-gradient-to-br
                from-[#12182a]
                via-[#101629]
                to-[#0d1323]

                shadow-[0_20px_60px_rgba(0,0,0,.35)]
            "
        >
          <table className="w-full">
            <thead
              className="
                        bg-white/[0.04]
                        backdrop-blur-xl
                        border-b
                        border-white/10
                    "
            >
              <tr
                className="
                            uppercase
                            text-xs
                            tracking-[0.18em]
                            text-gray-400
                        "
              >
                <th className="py-6 w-24">Rank</th>

                <th className="text-left">Player</th>

                <th className="text-center">Highest Rank</th>

                <th className="text-center">Wins</th>

                <th className="text-center">Losses</th>

                <th className="text-center">Win Rate</th>

                <th className="text-center">Championships</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {players.map((player) => (
                <tr
                  key={player._id}
                  className="
                                                group

                                                h-28

                                                transition-all
                                                duration-300

                                                hover:bg-gradient-to-r
                                                hover:from-violet-500/5
                                                hover:to-cyan-500/5

                                                hover:shadow-[inset_0_0_0_1px_rgba(139,92,246,.25)]
                                            "
                >
                  <td className="text-center">
                    <div className="flex justify-center">
                      {player.rank === 1 ? (
                        <div className="text-4xl drop-shadow-[0_0_12px_rgba(250,204,21,.8)]">
                          🥇
                        </div>
                      ) : player.rank === 2 ? (
                        <div className="text-4xl drop-shadow-[0_0_10px_rgba(229,231,235,.7)]">
                          🥈
                        </div>
                      ) : player.rank === 3 ? (
                        <div className="text-4xl drop-shadow-[0_0_10px_rgba(251,146,60,.7)]">
                          🥉
                        </div>
                      ) : (
                        <div
                          className="
                        h-10
                        w-10

                        rounded-full

                        border
                        border-white/10

                        bg-white/5

                        flex
                        items-center
                        justify-center

                        font-bold
                    "
                        >
                          {player.rank}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-6 px-5">
                    <Link
                      to={`/players/${player.username}`}
                      className="flex items-center gap-5"
                    >
                      {player.avatar ? (
                        <img
                          src={player.avatar}
                          alt={player.displayName}
                          className="
                        h-14
                        w-14

                        rounded-full

                        object-cover

                        border-2
                        border-violet-500/30

                        transition-all
                        duration-300

                        group-hover:scale-110
                        group-hover:border-violet-400
                    "
                        />
                      ) : (
                        <div
                          className="
                        h-14
                        w-14

                        rounded-full

                        bg-gradient-to-br
                        from-cyan-400
                        via-violet-500
                        to-purple-700

                        flex
                        items-center
                        justify-center

                        font-bold
                        text-lg

                        transition-all
                        duration-300

                        group-hover:scale-110
                    "
                        >
                          {player.displayName

                            .charAt(0)

                            .toUpperCase()}
                        </div>
                      )}

                      <div>
                        <h3
                          className="
                    text-lg
                    font-bold
                    text-white

                    transition-colors

                    group-hover:text-violet-300
                "
                        >
                          {player.displayName}
                        </h3>

                        <p className="text-gray-400">@{player.username}</p>
                      </div>
                    </Link>
                  </td>

                  <td className="text-center">
                    <span
                      className="
            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-violet-500/20

            bg-violet-500/10

            px-4
            py-2

            text-sm
            font-semibold

            transition-all
            duration-300

            group-hover:border-violet-400/40
            group-hover:bg-violet-500/20
        "
                    >
                      🛡️
                      {player.highestRank || "Unranked"}
                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className="
            inline-flex
            items-center
            justify-center

            min-w-[56px]

            rounded-xl

            bg-emerald-500/15

            px-3
            py-2

            font-bold
            text-emerald-300

            transition-all
            duration-300

            group-hover:scale-110
        "
                    >
                      {player.stats.wins}
                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className="
            inline-flex
            items-center
            justify-center

            min-w-[56px]

            rounded-xl

            bg-red-500/15

            px-3
            py-2

            font-bold
            text-red-300

            transition-all
            duration-300

            group-hover:scale-110
        "
                    >
                      {player.stats.losses}
                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className={clsx(
                        "inline-flex items-center justify-center rounded-xl px-4 py-2 font-bold transition-all duration-300 group-hover:scale-110 border",

                        Number(player.winRate) >= 70 &&
                          "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",

                        Number(player.winRate) >= 40 &&
                          Number(player.winRate) < 70 &&
                          "bg-violet-500/10 border-violet-500/20 text-violet-300",

                        Number(player.winRate) < 40 &&
                          "bg-violet-500/10 border-violet-500/20 text-red-300",
                      )}
                    >
                      {player.winRate}%
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span
                        className="
                inline-flex
                items-center
                justify-center

                rounded-xl

                bg-amber-500/15

                px-4
                py-2

                font-bold
                text-amber-300

                transition-all
                duration-300

                group-hover:scale-110
            "
                      >
                        🏆 {player.stats.championships}
                      </span>

                      <svg
                        className="
                h-5
                w-5

                text-violet-300

                opacity-0

                -translate-x-3

                transition-all
                duration-300

                group-hover:translate-x-0
                group-hover:opacity-100
            "
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
