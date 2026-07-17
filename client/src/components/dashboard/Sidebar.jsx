import {
    LayoutDashboard,
    User,
    Users,
    Shield,
    Trophy,
    Settings,
    LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import useAuthStore from "../../store/authStore";

const menuItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/"
    },
    {
        icon: User,
        label: "Profile",
        path: "/profile"
    },
    {
        icon: Users,
        label: "Players",
        path: "/players"
    },
    {
        icon: Shield,
        label: "Teams",
        path: "/team"
    },
    {
        icon: Trophy,
        label: "Tournaments",
        path: "/tournaments"
    },
    {
        icon: Settings,
        label: "Settings",
        path: "/settings"
    }
];

import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    async function handleLogout() {

        try {

            await logoutUser();

        }

        catch (err) {

            console.log(err);

        }

        finally {

            logout();

            navigate("/login");

        }

    }

    return (
        <aside
            className="
                fixed
                left-0
                top-0

                h-screen
                w-72

                bg-slate-900/80
                backdrop-blur-xl

                border-r
                border-white/10

                flex
                flex-col
                justify-between

                z-50
            "
        >
            <div>
                <div className="p-8">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                        GameForge
                    </h1>
                </div>

                <nav className="px-4">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                                w-full
                                flex
                                items-center
                                gap-4
                                px-5
                                py-4
                                mb-2
                                rounded-xl
                                transition-all
                                ${
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-400/20"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }
                                `
                            }
                        >
                            <item.icon size={22} />
                            {item.label}
                    </NavLink>
                    ))}
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    text-red-400
                    hover:bg-red-500/20
                    hover:border-red-400
                    transition-all
                "
            >
                <LogOut size={20}/>
                Logout
            </button>

        </aside>
    );
}