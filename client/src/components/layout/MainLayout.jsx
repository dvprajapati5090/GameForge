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

        <div className="relative h-screen overflow-hidden bg-[#090E1C] text-white">

            {/* Ambient Background */}

            <div className="absolute inset-0 pointer-events-none">

                <div
                    className="
                        absolute
                        -top-44
                        left-1/2
                        h-[600px]
                        w-[600px]
                        -translate-x-1/2
                        rounded-full
                        bg-violet-600/10
                        blur-[140px]
                    "
                />

                <div
                    className="
                        absolute
                        bottom-0
                        right-0
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-fuchsia-600/5
                        blur-[120px]
                    "
                />

                <div
                    className="
                        absolute
                        top-1/3
                        -left-32
                        h-[320px]
                        w-[320px]
                        rounded-full
                        bg-cyan-500/5
                        blur-[110px]
                    "
                />

                {/* Gaming Grid */}

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.035]
                        [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
                        [background-size:48px_48px]
                    "
                />

            </div>

            <Sidebar />

            <div className="relative z-10 ml-72 h-screen flex flex-col">

                <Navbar />

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        p-8

                        bg-gradient-to-b
                        from-[#10172A]/60
                        via-[#0F1628]/40
                        to-transparent
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}