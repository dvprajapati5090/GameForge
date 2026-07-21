import RecentTournaments from "./RecentTournaments";
import HostQuickActions from "./HostQuickActions";
import UpcomingMatches from "./UpcomingMatches";

export default function HostDashboardGrid() {

    return (

        <div className="grid xl:grid-cols-3 gap-8 mt-8">

            <div className="xl:col-span-2">

                <RecentTournaments />

            </div>

            <div>

                <HostQuickActions />

                <div className="mt-8">

                    <UpcomingMatches />

                </div>

            </div>

        </div>

    );

}