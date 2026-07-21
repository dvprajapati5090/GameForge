import useAuthStore from "../store/authStore";

import PlayerHero from "../components/profile/PlayerHero";
import AccountCard from "../components/profile/AccountCard";
import AboutCard from "../components/profile/AboutCard";
import FavouriteGamesCard from "../components/profile/FavouriteGamesCard";

export default function Profile() {

    const user = useAuthStore((state) => state.user);

    return (

        <div className="space-y-8">

            <PlayerHero player={user} />

            <div className="grid lg:grid-cols-2 gap-8">

                <AccountCard player={user} />

                <AboutCard player={user} />

            </div>

            <FavouriteGamesCard player={user} />

        </div>

    );

}