import { useState } from "react";
import { useParams } from "react-router-dom";

import EditTournamentModal from "../components/host/tournaments/EditTournamentModal";
import useUpdateTournament from "../hooks/useUpdateTournament";
import useTournament from "../hooks/useTournament";

import TournamentHeader from "../components/host/tournaments/TournamentHeader";
import TournamentStats from "../components/host/tournaments/TournamentStats";
import TournamentTabs from "../components/host/tournaments/TournamentTabs";

import OverviewTab from "../components/host/tournaments/OverviewTab";
import TeamsTab from "../components/host/tournaments/TeamsTab";
import BracketTab from "../components/host/tournaments/BracketTab";
import SettingsTab from "../components/host/tournaments/SettingsTab";

import ChampionCard from "../components/bracket/ChampionCard";

import useDeleteTournament from "../hooks/useDeleteTournament";

export default function HostTournamentDetailsPage() {

    const { id } = useParams();
    const deleteMutation = useDeleteTournament();

    console.log("HostTournamentDetailsPage");
    console.log(useParams());
    console.log(id);

    const { data, isLoading } = useTournament(id);

    const [tab, setTab] = useState("overview");

    const [openEdit, setOpenEdit] = useState(false);

    const updateMutation = useUpdateTournament(id);

    if (isLoading) {

        return <div>Loading...</div>;

    }

    const tournament = data.data;

    return (

        <div className="space-y-8">

            <ChampionCard
                tournament={tournament}
            />

            <TournamentHeader

                tournament={tournament}

                onEdit={() =>

                    setOpenEdit(true)

                }

                onDelete={() =>

                    deleteMutation.mutate(

                        tournament._id

                    )

                }

            />

            <TournamentStats tournament={tournament} />

            <TournamentTabs
                tab={tab}
                setTab={setTab}
            />

            {tab === "overview" && (
                <OverviewTab tournament={tournament} />
            )}

            {tab === "teams" && (
                <TeamsTab tournament={tournament} />
            )}

            {tab === "bracket" && (
                <BracketTab tournament={tournament} />
            )}

            {tab === "settings" && (
                <SettingsTab tournament={tournament} />
            )}

            <EditTournamentModal

                open={openEdit}

                tournament={tournament}

                onClose={() =>

                    setOpenEdit(false)

                }

                onSave={(form) => {

                    updateMutation.mutate(form);

                    setOpenEdit(false);

                }}

            />

        </div>

    );

}