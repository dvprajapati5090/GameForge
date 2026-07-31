import {
    LayoutDashboard,
    Users,
    Trophy,
    Settings,
    LogOut,
    Sparkles,
    Medal,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/auth.service";
import useAuthStore from "../../store/authStore";

const menuItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/host",
    },
    {
        icon: Trophy,
        label: "My Tournaments",
        path: "/host/tournaments",
    },
    {
        icon: Trophy,
        label: "Create Tournament",
        path: "/host/create-tournament",
    },
    {
        icon: Users,
        label: "Players",
        path: "/players",
    },
    {
        icon: Medal,
        label: "Leaderboard",
        path: "/leaderboard",
    },
    {
        icon: Settings,
        label: "Settings",
        path: "/settings",
    },
];

export default function Sidebar() {
    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    async function handleLogout() {
        try {
            await logoutUser();
        } catch (err) {
            console.log(err);
        } finally {
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
                z-50
                flex
                h-screen
                w-73
                flex-col
                justify-between
                overflow-hidden
                border-r
                border-white/10
                bg-[#0B1020]/80
                backdrop-blur-2xl
            "
        >
            <div className="absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-600/15 blur-[120px]" />

                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[120px]" />

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.04]
                        [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                        [background-size:38px_38px]
                    "
                />
            </div>

            <div className="relative z-10">
                <div className="border-b border-white/10 px-8 py-8">
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-violet-400/30
                                bg-gradient-to-br
                                from-violet-500/30
                                to-fuchsia-500/20
                                backdrop-blur-xl
                            "
                        >
                            <Sparkles
                                size={22}
                                className="text-violet-300"
                            />
                        </div>

                        <div>
                            <h1
                                className="
                                    bg-gradient-to-r
                                    from-violet-300
                                    via-fuchsia-300
                                    to-indigo-300
                                    bg-clip-text
                                    text-3xl
                                    font-black
                                    text-transparent
                                "
                            >
                                GameForge
                            </h1>

                            <p className="mt-1 text-xs uppercase tracking-[3px] text-slate-500">
                                Tournament Host
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="mt-8 px-4">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.path === "/host"}
                            className={({ isActive }) =>
                                `
                                group
                                relative
                                mb-3
                                flex
                                items-center
                                gap-4
                                overflow-hidden
                                rounded-2xl
                                px-5
                                py-2
                                transition-all
                                duration-300
                                ${
                                    isActive
                                        ? `
                                        border
                                        border-violet-400/30
                                        bg-gradient-to-r
                                        from-violet-500/20
                                        via-fuchsia-500/10
                                        to-transparent
                                        text-white
                                        shadow-[0_0_25px_rgba(139,92,246,0.15)]
                                        `
                                        : `
                                        border
                                        border-transparent
                                        text-slate-300
                                        hover:border-violet-400/20
                                        hover:bg-white/5
                                        hover:text-white
                                        `
                                }
                                `
                            }
                        >
                            <div
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    w-1
                                    rounded-r-full
                                    bg-gradient-to-b
                                    from-violet-400
                                    to-fuchsia-400
                                    opacity-0
                                    transition-all
                                    group-hover:opacity-100
                                "
                            />

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white/5
                                    transition-all
                                    group-hover:bg-violet-500/15
                                "
                            >
                                <item.icon size={21} />
                            </div>

                            <span className="font-medium tracking-wide">
                                {item.label}
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="relative z-10 p-4">
                <button
                    onClick={handleLogout}
                    className="
                        group
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        px-4
                        py-2
                        font-medium
                        text-red-300
                        transition-all
                        duration-300
                        hover:border-red-400/40
                        hover:bg-red-500/20
                        hover:text-red-200
                        hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]
                    "
                >
                    <LogOut
                        size={20}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />

                    Logout
                </button>
            </div>
        </aside>
    );
}