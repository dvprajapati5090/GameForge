import MainLayout from "../components/layout/MainLayout";

import HeroBanner from "../components/dashboard/HeroBanner";
import StatsSection from "../components/dashboard/StatsSection";
import DashboardGrid from "../components/dashboard/DashboardGrid";

export default function Dashboard() {

    return (

        <MainLayout>

            <HeroBanner />

            <div className="mt-8">

                <StatsSection />

            </div>

            <DashboardGrid />

        </MainLayout>

    );

}