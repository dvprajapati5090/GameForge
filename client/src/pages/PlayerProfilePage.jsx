import { useParams } from "react-router-dom";

import usePlayer from "../hooks/usePlayer";

import PlayerHero from "../components/profile/PlayerHero";
import AccountCard from "../components/profile/AccountCard";
import AboutCard from "../components/profile/AboutCard";
import FavouriteGamesCard from "../components/profile/FavouriteGamesCard";

export default function PlayerProfilePage() {

    const { username } = useParams();

    const { data, isLoading } = usePlayer(username);

    if (isLoading) {

        return <h1>Loading...</h1>;

    }

    const player = data.data;

    return (

        <div className="space-y-8">

            <PlayerHero player={player} />

            <div className="grid lg:grid-cols-2 gap-8">

                <AccountCard player={player} />

                <AboutCard player={player} />

            </div>

            <FavouriteGamesCard player={player} />

        </div>

    );

}