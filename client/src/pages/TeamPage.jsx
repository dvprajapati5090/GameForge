import useTeam from "../hooks/useTeam";

import Loader from "../components/common/Loader";
import EmptyTeam from "../components/team/EmptyTeam";

import TeamHero from "../components/team/TeamHero";
import TeamMembers from "../components/team/TeamMembers";

import TeamChat from "../components/team/TeamChat";

import TeamSettings from "../components/team/TeamSettings";

export default function TeamPage() {

    const {
        data,
        isLoading,
        error
    } = useTeam();

    if (isLoading)
        return <Loader />;

    if (error?.response?.status === 404)
        return <EmptyTeam />;

    const team = data.data;

    return (

        <div
            className="
                max-w-7xl
                mx-auto
                px-6
                py-8
            "
        >

            <TeamHero team={team} />

            <TeamMembers team={team} />

            <TeamChat />

            <TeamSettings team={team} />

        </div>

    );

}