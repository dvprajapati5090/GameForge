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

import { useState, useEffect } from "react";

import TournamentTabs from "../components/tournaments/TournamentTabs";

import RegisteredTeams from "../components/tournaments/RegisteredTeams";

import { useQueryClient } from "@tanstack/react-query";
import socket from "../socket/socket";

export default function TournamentDetailsPage() {

    const { id } = useParams();
    const queryClient = useQueryClient();

    // Invalidate tournament data when any tournament update or bracket update fires
    // This is what makes ChampionCard appear automatically on tournament completion
    useEffect(() => {
        const refresh = () => {
            queryClient.invalidateQueries({ queryKey: ["tournament", id] });
        };
        socket.on("tournamentUpdated", refresh);
        socket.on("bracketUpdated", refresh);
        return () => {
            socket.off("tournamentUpdated", refresh);
            socket.off("bracketUpdated", refresh);
        };
    }, [id, queryClient]);

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

                    <div className="tournament-overview-grid grid lg:grid-cols-3 gap-8">

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
                    <div style={{
                        borderRadius: 22, padding: '32px 36px',
                        background: 'rgba(7,0,10,0.72)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(192,192,192,0.12)',
                        borderTop: '2px solid #e8003d',
                        fontFamily: '"Space Mono", monospace',
                        boxShadow: '0 0 32px rgba(232,0,61,0.06), 0 16px 48px rgba(0,0,0,0.45)',
                    }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 20 }}>
                            Rules
                        </h2>
                        <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.2), transparent)', marginBottom: 20 }} />
                        <p style={{ fontSize: 12, color: 'rgba(192,192,192,0.6)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                            {tournament.rules || "No rules added."}
                        </p>
                    </div>
                )
            }

        </div>
    );

}