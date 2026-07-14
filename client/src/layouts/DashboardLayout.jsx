import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

export default function DashboardLayout({ children }) {

    return (

        <div className="min-h-screen flex bg-[#0F172A]">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}