import HostHero from "../components/host/HostHero";
import HostStats from "../components/host/HostStats";
import HostDashboardGrid from "../components/host/HostDashboardGrid";

export default function HostDashboard() {

    return (

        <>

            <HostHero />

            <div className="mt-8">

                <HostStats />

            </div>

            <HostDashboardGrid />

        </>

    );

}