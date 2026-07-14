import TournamentWidget from "./TournamentWidget";
import RecentActivity from "./RecentActivity";
import AnalyticsChart from "./AnalyticsChart";
import QuickActions from "./QuickActions";

export default function DashboardGrid() {

    return (

        <div className="mt-8 space-y-8">

            <div className="grid lg:grid-cols-2 gap-8">

                <TournamentWidget />

                <RecentActivity />

            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

                <AnalyticsChart />

                <QuickActions />

            </div>

        </div>

    );

}