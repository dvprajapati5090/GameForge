import { Outlet } from "react-router-dom";

import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";

export default function MainLayout() {

    return (

        <div className="h-screen bg-[#0F172A] text-white">

            <Sidebar />

            <div className="ml-72 h-screen flex flex-col">

                <Navbar />

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        p-8
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}