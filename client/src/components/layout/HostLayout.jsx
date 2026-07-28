import { Outlet } from "react-router-dom";

import HostSidebar from "../host/HostSidebar";
import Navbar from "../dashboard/Navbar";

export default function HostLayout() {
    return (
        <div className="relative h-screen overflow-hidden bg-[#0B1020] text-white">
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]
                    bg-[size:50px_50px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    top-[-220px]
                    right-[-180px]
                    h-[700px]
                    w-[700px]
                    rounded-full
                    bg-violet-600/15
                    blur-[170px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-260px]
                    left-[-220px]
                    h-[650px]
                    w-[650px]
                    rounded-full
                    bg-fuchsia-600/10
                    blur-[180px]
                "
            />

            <HostSidebar />

            <div className="ml-72 flex h-screen flex-col">
                <Navbar />

                <main
                    className="
                        relative
                        flex-1
                        overflow-y-auto
                        px-10
                        py-8
                    "
                >
                    <div className="relative z-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}