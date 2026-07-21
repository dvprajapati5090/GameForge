import { Outlet } from "react-router-dom";

import PlayerSidebar from "../dashboard/PlayerSidebar";
import HostSidebar from "../host/HostSidebar";
import Navbar from "../dashboard/Navbar";

import useAuthStore from "../../store/authStore";

export default function MainLayout() {

    const user = useAuthStore((state) => state.user);

    const Sidebar =
        user?.role === "HOST"
            ? HostSidebar
            : PlayerSidebar;

    return (

        <div className="h-screen bg-[#0F172A] text-white">

            <Sidebar />

            <div className="ml-72 h-screen flex flex-col">

                <Navbar />

                <main className="flex-1 overflow-y-auto p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}