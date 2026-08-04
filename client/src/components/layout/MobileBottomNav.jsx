/**
 * MobileBottomNav — Bottom navigation for mobile screens
 * Hidden on desktop via mobile.css (.mobile-bottom-nav { display: none })
 * Shown only when viewport ≤ 768px
 */
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, User, Users, Shield,
    Trophy, Settings, Medal,
    PlusSquare, LogOut,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import { logoutUser } from "../../services/auth.service";

const PLAYER_MENU = [
    { icon: LayoutDashboard, label: "Home",       path: "/dashboard",   end: true },
    { icon: User,            label: "Profile",    path: "/profile" },
    { icon: Shield,          label: "Team",       path: "/team" },
    { icon: Trophy,          label: "Compete",    path: "/tournaments" },
    { icon: Settings,        label: "Settings",   path: "/settings" },
];

const HOST_MENU = [
    { icon: LayoutDashboard, label: "Home",       path: "/host",                      end: true },
    { icon: Trophy,          label: "My Events",  path: "/host/tournaments" },
    { icon: PlusSquare,      label: "Create",     path: "/host/create-tournament" },
    { icon: Users,           label: "Players",    path: "/host/players" },
    { icon: Settings,        label: "Settings",   path: "/host/settings" },
];

const F = '"Space Mono", monospace';

export default function MobileBottomNav({ isHost = false }) {
    const navigate = useNavigate();
    const logout = useAuthStore(s => s.logout);
    const menu = isHost ? HOST_MENU : PLAYER_MENU;

    const handleLogout = async () => {
        try { await logoutUser(); } catch (e) { console.error(e); }
        finally { logout(); navigate("/login"); }
    };

    return (
        <nav className="mobile-bottom-nav" style={{ fontFamily: F }}>
            {menu.map(({ icon: Icon, label, path, end }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={end}
                    style={({ isActive }) => ({
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', gap: 4, flex: 1,
                        padding: '6px 4px', borderRadius: 12,
                        textDecoration: 'none',
                        color: isActive ? '#e8003d' : 'rgba(255,255,255,0.4)',
                        background: isActive ? 'rgba(232,0,61,0.1)' : 'transparent',
                        transition: 'all 0.18s ease',
                    })}
                >
                    {({ isActive }) => (
                        <>
                            <Icon
                                size={18}
                                strokeWidth={isActive ? 2.2 : 1.6}
                                color={isActive ? '#e8003d' : 'rgba(255,255,255,0.4)'}
                            />
                            <span style={{
                                fontSize: 8, fontWeight: isActive ? 700 : 400,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: isActive ? '#e8003d' : 'rgba(255,255,255,0.35)',
                            }}>
                                {label}
                            </span>
                            {isActive && (
                                <div style={{
                                    position: 'absolute', top: 0, width: 28, height: 2,
                                    background: '#e8003d',
                                    borderRadius: '0 0 4px 4px',
                                    boxShadow: '0 0 8px rgba(232,0,61,0.8)',
                                }} />
                            )}
                        </>
                    )}
                </NavLink>
            ))}

            {/* Logout */}
            <button
                onClick={handleLogout}
                style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', gap: 4, flex: 1,
                    padding: '6px 4px', borderRadius: 12,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.35)',
                    fontFamily: F,
                }}
            >
                <LogOut size={18} strokeWidth={1.6} />
                <span style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Exit
                </span>
            </button>
        </nav>
    );
}
