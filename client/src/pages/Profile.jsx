import PlayerHero from "../components/profile/PlayerHero";
import AccountCard from "../components/profile/AccountCard";
import AboutCard from "../components/profile/AboutCard";
import FavouriteGamesCard from "../components/profile/FavouriteGamesCard";

export default function Profile() {

    return (

        <div className="space-y-8">

            <PlayerHero />

            <div className="grid lg:grid-cols-2 gap-8">

                <AccountCard />

                <AboutCard />

            </div>

            <FavouriteGamesCard />

        </div>

    );

}