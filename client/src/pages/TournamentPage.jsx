import useTournaments from "../hooks/useTournaments";

import TournamentHero from "../components/tournaments/TournamentHero";
import TournamentFilters from "../components/tournaments/TournamentFilters";
import TournamentGrid from "../components/tournaments/TournamentGrid";
import EmptyTournament from "../components/tournaments/EmptyTournament";
import FeaturedTournament from "../components/tournaments/FeaturedTournament";

import TournamentPageHero from "../components/tournaments/TournamentPageHero";

export default function TournamentPage() {

    const {

        data,

        isLoading

    } = useTournaments();

    if (isLoading) {

        return (

            <div className="py-20 text-center">

                Loading tournaments...

            </div>

        );

    }

    const tournaments =

        data?.data?.tournaments || [];

    return (

        <div className="max-w-7xl mx-auto px-8 py-10">

            <TournamentPageHero />

            {

                tournaments.length > 0 && (

                    <FeaturedTournament

                        tournament={tournaments[0]}

                    />

                )

            }

            <TournamentFilters />

            {

                tournaments.length === 0 ?

                    <EmptyTournament />

                    :

                    <TournamentGrid

                        tournaments={tournaments}

                    />

            }

        </div>

    );

}