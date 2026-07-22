import useAuthStore from "../store/authStore";

import PlayerHero from "../components/profile/PlayerHero";
import AccountCard from "../components/profile/AccountCard";
import AboutCard from "../components/profile/AboutCard";
import FavouriteGamesCard from "../components/profile/FavouriteGamesCard";
import CareerStats from "../components/profile/CareerStats";

import usePlayerCareer from "../hooks/usePlayerCareer";

export default function Profile() {

    const user = useAuthStore((state) => state.user);

    const {

        data,

        isLoading

    } = usePlayerCareer(user?._id);

    return (

        <div className="space-y-8">

            <PlayerHero player={user} />

            {

                isLoading ? (

                    <div
                        className="
                            bg-[#1b2333]
                            rounded-xl
                            p-6
                            text-center
                            text-gray-400
                        "
                    >

                        Loading Career...

                    </div>

                ) : (

                    data &&

                    <CareerStats

                        stats={data.stats}

                    />

                )

            }

            <div className="grid lg:grid-cols-2 gap-8">

                <AccountCard player={user} />

                <AboutCard player={user} />

            </div>

            <FavouriteGamesCard player={user} />

        </div>

    );

}