import { useState } from "react";

import PlayersHeader from "../components/players/PlayersHeader";
import PlayersSearch from "../components/players/PlayersSearch";
import PlayerGrid from "../components/players/PlayerGrid";

import usePlayers from "../hooks/usePlayers";

import useAuthStore from "../store/authStore";

export default function PlayersPage() {

    const { data, isLoading } = usePlayers();

    const [search, setSearch] = useState("");

    const user = useAuthStore((state) => state.user);

    const players =
        (data?.data || []).filter(
            (player) => player.username !== user?.username
        );

    const filteredPlayers = players.filter((player) =>

        player.displayName
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        player.riotGameName
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        player.username
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="space-y-8">

            <PlayersHeader />

            <PlayersSearch

                value={search}

                onChange={setSearch}

            />

            <PlayerGrid

                players={filteredPlayers}

                loading={isLoading}

            />

        </div>

    );

}