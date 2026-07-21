import { useParams } from "react-router-dom";

import useTournament from "../hooks/useTournament";

import TournamentBanner from "../components/tournaments/TournamentBanner";
import TournamentDescription from "../components/tournaments/TournamentDescription";
import TournamentInfo from "../components/tournaments/TournamentInfo";
import TournamentTeams from "../components/tournaments/TournamentTeams";
import TournamentRegisterButton from "../components/tournaments/TournamentRegisterButton";
import TournamentBracket from "../components/tournaments/TournamentBracket";
import TournamentActions from "../components/tournaments/TournamentActions";
import TournamentHero from "../components/tournaments/TournamentHero";
import TournamentRegistrationCard from "../components/tournaments/TournamentRegistrationCard";
import TournamentTimeline from "../components/tournaments/TournamentTimeline";
import TournamentOverview from "../components/tournaments/TournamentOverview";

import ChampionCard from "../components/bracket/ChampionCard";

import { useState } from "react";

import TournamentTabs from "../components/tournaments/TournamentTabs";

import RegisteredTeams from "../components/tournaments/RegisteredTeams";

export default function TournamentDetailsPage() {

    const { id } = useParams();

    const [tab, setTab] = useState("overview");

    const {

        data,

        isLoading

    } = useTournament(id);

    if (isLoading) {

        return (

            <div className="text-center py-20">

                Loading...

            </div>

        );

    }

    if (!data?.data) {

        return (

            <div className="text-center py-20">

                Tournament no longer exists.

            </div>

        );

    }

    const tournament = data.data;

    return (

        <div className="space-y-8">

            <ChampionCard tournament={tournament}/>

            <TournamentHero tournament={tournament} />

            <TournamentBanner tournament={tournament} />

            <TournamentTabs

                tab={tab}

                setTab={setTab}

            />

            {
                tab === "overview" && (

                    <div className="grid lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-8">

                            <TournamentDescription
                                tournament={tournament}
                            />

                            <TournamentActions
                                tournament={tournament}
                            />

                            <TournamentInfo
                                tournament={tournament}
                            />

                        </div>

                        <div>

                            <TournamentRegistrationCard
                                tournament={tournament}
                            />

                        </div>

                    </div>

                )
            }

            {

                tab==="teams" && (

                    <RegisteredTeams

                        teams={tournament.registeredTeams}

                    />

                )

            }

            {

                tab==="bracket" && (

                    <TournamentBracket

                        tournamentId={id}

                    />

                )

            }

            {

                tab==="rules" && (

                    <div className="rounded-3xl bg-slate-900 p-8">

                        <h2 className="text-2xl font-bold">

                            Rules

                        </h2>

                        <p className="mt-6 whitespace-pre-wrap">

                            {tournament.rules || "No rules added."}

                        </p>

                    </div>

                )

            }

        </div>
    );

}