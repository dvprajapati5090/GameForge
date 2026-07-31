import RecentTournaments from "./RecentTournaments";
import HostQuickActions from "./HostQuickActions";

export default function HostDashboardGrid() {

    return (

        <div className="grid xl:grid-cols-3 gap-8 mt-8">

            <div className="xl:col-span-2">

                <RecentTournaments />

            </div>

            <div>

                <HostQuickActions />

            </div>

        </div>

    );

}