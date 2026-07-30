import HeroBanner from "../components/dashboard/HeroBanner";
import StatsSection from "../components/dashboard/StatsSection";
import DashboardGrid from "../components/dashboard/DashboardGrid";

export default function Dashboard() {

    return (

        <>

            <div className="relative z-0">
                <HeroBanner />
            </div>

            <div className="mt-8">

                <StatsSection />

            </div>

            <DashboardGrid />

        </>

    );

}