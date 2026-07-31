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


    const filteredPlayers = players.filter((player) => {

        const searchText = search.toLowerCase();

        return (

            player.displayName
                ?.toLowerCase()
                .includes(searchText)

            ||

            player.riotGameName
                ?.toLowerCase()
                .includes(searchText)

            ||

            player.username
                ?.toLowerCase()
                .includes(searchText)

        );

    });


    return (

        <div
    className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#090b24]
        bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
        bg-[size:32px_32px]
    "
>

            {/* Background glow */}

            <div className="
                absolute
                -top-40
                -left-40
                w-96
                h-96
                bg-purple-600/20
                rounded-full
                blur-3xl
            " />


            <div className="
                absolute
                bottom-0
                right-0
                w-96
                h-96
                bg-blue-600/10
                rounded-full
                blur-3xl
            " />


            <div className="
                relative
                space-y-8
                p-6
                md:p-8
            ">


                <PlayersHeader />


                <div className="
                    bg-white/5
                    backdrop-blur-xl
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    shadow-xl
                ">

                    <PlayersSearch

                        value={search}

                        onChange={setSearch}

                    />

                </div>



                <PlayerGrid

                    players={filteredPlayers}

                    loading={isLoading}

                />


            </div>


        </div>

    );

}