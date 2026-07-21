import { Outlet } from "react-router-dom";

import HostSidebar from "../host/HostSidebar";
import Navbar from "../dashboard/Navbar";

export default function HostLayout() {

    return (

        <div className="h-screen bg-[#0F172A] text-white">

            <HostSidebar />

            <div className="ml-72 h-screen flex flex-col">

                <Navbar />

                <main className="flex-1 overflow-y-auto p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}