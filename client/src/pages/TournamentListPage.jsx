import { Link } from "react-router-dom";

import useAuthStore from "../store/authStore";
import useTournaments from "../hooks/useTournaments";

import TournamentFilters from "../components/tournament/TournamentFilters";
import TournamentGrid from "../components/tournament/TournamentGrid";

export default function TournamentListPage() {

    const user = useAuthStore(
        state => state.user
    );

    const {
        data,
        isLoading
    } = useTournaments();

    if (isLoading) {

        return (

            <div className="flex justify-center py-20">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Tournaments

                </h1>

                {

                    user?.role === "HOST" && (

                        <Link

                            to="/host/create-tournament"

                            className="
                                bg-cyan-500
                                hover:bg-cyan-400
                                px-5
                                py-3
                                rounded-lg
                                font-semibold
                            "

                        >

                            + Create Tournament

                        </Link>

                    )

                }

            </div>

            <TournamentFilters />

            <div className="mt-8">

                <TournamentGrid

                    tournaments={
                        data.data.tournaments
                    }

                />

            </div>

        </div>

    );

}