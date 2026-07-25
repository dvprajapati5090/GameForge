import TournamentWidget from "./TournamentWidget";
import RecentActivity from "./RecentActivity";
import AnalyticsChart from "./AnalyticsChart";
import QuickActions from "./QuickActions";

export default function DashboardGrid() {

    return (

        <section
            className="
                mt-10
                flex
                flex-col
                gap-8
            "
        >

            {/* Top Row */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-8

                    xl:grid-cols-2
                "
            >

                <TournamentWidget />

                <RecentActivity />

            </div>

            {/* Bottom Row */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-8

                    xl:grid-cols-[1.8fr_1fr]
                "
            >

                <AnalyticsChart />

                <QuickActions />

            </div>

        </section>

    );

}