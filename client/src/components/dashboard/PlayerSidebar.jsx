/**
 * PlayerSidebar — Apple Liquid Glass × Gaming
 *
 * • Collapsed  : 66 px icon pill, flush left
 * • Expanded   : 270 px frosted-glass panel, silky 0.55 s ease
 * • Theme      : deep dark glass + neon crimson accents
 */

import { useState, useRef } from "react";
import {
    LayoutDashboard, User, Users, Shield,
    Trophy, Settings, LogOut, Medal,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import useAuthStore from "../../store/authStore";
import ForgeLogo from "../ui/ForgeLogo";

/* ─── config ─────────────────────────────────────────────── */
const MENU = [
    { icon: LayoutDashboard, label: "Dashboard",   path: "/dashboard", end: true },
    { icon: User,            label: "Profile",     path: "/profile" },
    { icon: Users,           label: "Players",     path: "/players" },
    { icon: Medal,           label: "Leaderboard", path: "/leaderboard" },
    { icon: Shield,          label: "Teams",       path: "/team" },
    { icon: Trophy,          label: "Tournaments", path: "/tournaments" },
    { icon: Settings,        label: "Settings",    path: "/settings" },
];

const W0  = 66;          // collapsed px
const W1  = 270;         // expanded  px
const DUR = "0.55s";     // slow, silk
const EZ  = "cubic-bezier(0.16, 1, 0.3, 1)";   // smooth decelerate — no overshoot

/* ─── keyframes ──────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes ps-stripe {
    0%,100% { opacity:.7; }
    50%      { opacity:1; }
  }
  @keyframes ps-dot {
    0%,100% { transform:scale(1);   opacity:1; }
    50%      { transform:scale(1.5); opacity:.6; }
  }
  @keyframes ps-slide {
    from { opacity:0; transform:translateX(-10px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes ps-float {
    0%,100% { transform:translateY(0px);   }
    50%      { transform:translateY(-3px); }
  }
`;

/* ─── Apple glass helpers ─────────────────────────────────── */
const glass = (alpha = 0.72) =>
    `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(8,2,14,${alpha})`;

export default function PlayerSidebar() {
    const navigate = useNavigate();
    const logout   = useAuthStore(s => s.logout);
    const user     = useAuthStore(s => s.user);

    const [open, setOpen]       = useState(false);
    const [hovIdx, setHovIdx]   = useState(null);
    const [logHov, setLogHov]   = useState(false);
    const leaveT = useRef(null);

    const show = () => { clearTimeout(leaveT.current); setOpen(true);  };
    const hide = () => { leaveT.current = setTimeout(() => setOpen(false), 120); };

    const handleLogout = async () => {
        try { await logoutUser(); } catch (e) { console.error(e); }
        finally { logout(); navigate("/login"); }
    };

    /* shared transition */
    const T = (props = "all") => `${props} ${DUR} ${EZ}`;

    return (
        <>
            <style>{KEYFRAMES}</style>

            {/* ── ASIDE ───────────────────────────────────────────── */}
            <aside
                onMouseEnter={show}
                onMouseLeave={hide}
                style={{
                    position : "fixed", left: 0, top: 0, zIndex: 300,
                    height   : "100vh",
                    width    : open ? W1 : W0,
                    transition: `width ${DUR} ${EZ}, border-radius ${DUR} ${EZ}, box-shadow ${DUR} ${EZ}`,
                    overflow  : "hidden",

                    /* Apple liquid glass */
                    background    : glass(open ? 0.78 : 0.65),
                    backdropFilter: "blur(52px) saturate(2) brightness(0.9)",
                    WebkitBackdropFilter: "blur(52px) saturate(2) brightness(0.9)",

                    /* Big pill right edge */
                    borderRadius : open ? "0 36px 36px 0" : "0 22px 22px 0",

                    /* Hair-thin Apple-style border */
                    border    : "none",
                    borderRight: `1px solid ${open ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)"}`,

                    /* Layered shadow — depth + glow */
                    boxShadow: open
                        ? "8px 0 80px rgba(0,0,0,0.55), 2px 0 0 rgba(255,255,255,0.06) inset, 0 0 60px rgba(232,0,61,0.07)"
                        : "4px 0 30px rgba(0,0,0,0.4)",

                    fontFamily: '"Space Mono", monospace',
                    display   : "flex", flexDirection: "column",
                    userSelect: "none",
                }}
            >
                {/* ── neon top stripe ── */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 10,
                    background : "linear-gradient(90deg, transparent 0%, #e8003d 30%, #ff3060 60%, transparent 100%)",
                    boxShadow  : "0 0 18px rgba(232,0,61,0.9)",
                    borderRadius: "0 0 1px 0",
                    animation  : "ps-stripe 4s ease-in-out infinite",
                }} />

                {/* ── inner glass sheen — top-left highlight ── */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                    pointerEvents: "none", zIndex: 0, borderRadius: "inherit",
                }} />

                {/* ── subtle dot noise ── */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize : "20px 20px",
                }} />

                {/* ── right-edge specular line ── */}
                <div style={{
                    position  : "absolute", top: 0, right: 0, width: 1, height: "100%", zIndex: 6,
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(232,0,61,0.25) 20%, rgba(255,255,255,0.05) 60%, transparent 90%)",
                    transition: T("opacity"),
                    opacity   : open ? 1 : 0.5,
                }} />

                {/* ── crimson left-edge accent ── */}
                <div style={{
                    position  : "absolute", top: 24, left: 0, width: 2, height: "calc(100% - 48px)", zIndex: 6,
                    background: "linear-gradient(to bottom, transparent, rgba(232,0,61,0.55) 25%, rgba(232,0,61,0.35) 75%, transparent)",
                    borderRadius: "0 2px 2px 0",
                }} />

                {/* ════════════════════════════════ SCROLL AREA ═══════ */}
                <div style={{
                    position: "relative", zIndex: 1,
                    display: "flex", flexDirection: "column", height: "100%",
                    overflowY: "auto", overflowX: "hidden",
                    scrollbarWidth: "none",
                }}>

                    {/* ── LOGO ── */}
                    <div style={{
                        display      : "flex", alignItems: "center",
                        padding      : "20px 0 16px",
                        paddingLeft  : open ? 18 : 0,
                        justifyContent: open ? "flex-start" : "center",
                        minHeight    : 72, flexShrink: 0,
                        borderBottom : "1px solid rgba(255,255,255,0.06)",
                        transition   : T(),
                    }}>
                        {/* icon badge */}
                        <div style={{
                            position  : "relative",
                            display   : "flex", alignItems: "center", justifyContent: "center",
                            width: 40, height: 40, flexShrink: 0,
                            borderRadius: 16,
                            background: "linear-gradient(145deg, rgba(232,0,61,0.28), rgba(232,0,61,0.10))",
                            border    : "1px solid rgba(232,0,61,0.45)",
                            boxShadow : open
                                ? "0 0 24px rgba(232,0,61,0.5), inset 0 1px 0 rgba(255,255,255,0.12)"
                                : "0 0 12px rgba(232,0,61,0.3)",
                            transition: T("box-shadow"),
                            animation : "ps-float 6s ease-in-out infinite",
                        }}>
                            <ForgeLogo size={19} color="#e8003d" />
                            {/* outer ring */}
                            <div style={{
                                position: "absolute", inset: -5, borderRadius: 21,
                                border  : "1px solid rgba(232,0,61,0.18)",
                                opacity : open ? 1 : 0,
                                transition: T("opacity"),
                            }} />
                        </div>

                        {/* wordmark */}
                        <div style={{
                            marginLeft: 13,
                            opacity   : open ? 1 : 0,
                            transform : open ? "translateX(0)" : "translateX(-14px)",
                            transition: T(),
                            whiteSpace: "nowrap", overflow: "hidden",
                        }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                                GameForge
                            </div>
                            <div style={{ marginTop: 3, fontSize: 7.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
                                Esports Platform
                            </div>
                        </div>
                    </div>

                    {/* ── USER CARD (expanded) ── */}
                    <div style={{
                        margin    : "12px 10px 0",
                        padding   : "9px 12px",
                        borderRadius: 18,
                        background: "rgba(255,255,255,0.05)",
                        border    : "1px solid rgba(255,255,255,0.09)",
                        backdropFilter: "blur(8px)",
                        display   : "flex", alignItems: "center", gap: 10,
                        flexShrink: 0,
                        opacity   : open ? 1 : 0,
                        transform : open ? "translateY(0)" : "translateY(-6px)",
                        transition: T(),
                        pointerEvents: open ? "auto" : "none",
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 10,
                            background: "linear-gradient(135deg, rgba(232,0,61,0.55), rgba(232,0,61,0.22))",
                            border: "1px solid rgba(232,0,61,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <User size={13} color="#e8003d" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
                                {user?.username || "Player"}
                            </div>
                            <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>
                                Player
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{
                                width: 7, height: 7, borderRadius: "50%",
                                background: "#22c55e", boxShadow: "0 0 8px #22c55e",
                                animation: "ps-dot 3s ease-in-out infinite",
                            }} />
                        </div>
                    </div>

                    {/* ── USER AVATAR PILL (collapsed) ── */}
                    <div style={{
                        margin    : "12px auto 0",
                        width: 36, height: 36, borderRadius: 13,
                        background: "rgba(255,255,255,0.05)",
                        border    : "1px solid rgba(255,255,255,0.09)",
                        display   : "flex", alignItems: "center", justifyContent: "center",
                        opacity   : open ? 0 : 1,
                        transform : open ? "scale(0.75)" : "scale(1)",
                        transition: T(),
                        flexShrink: 0,
                        position  : open ? "absolute" : "relative",
                        pointerEvents: "none",
                    }}>
                        <User size={15} color="rgba(232,0,61,0.9)" />
                    </div>

                    {/* ── NAV LABEL ── */}
                    <div style={{
                        padding  : open ? "16px 18px 6px" : "16px 0 6px",
                        display  : "flex", alignItems: "center", gap: 8,
                        opacity  : open ? 0.55 : 0,
                        transition: T("opacity, padding"),
                        flexShrink: 0,
                    }}>
                        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.1)" }} />
                        <span style={{ fontSize: 7.5, letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", fontWeight: 700 }}>
                            Nav
                        </span>
                        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.1)" }} />
                    </div>

                    {/* ════════ NAV ITEMS ════════ */}
                    <nav style={{
                        flex   : 1,
                        padding: open ? "4px 10px" : "4px 9px",
                        transition: T("padding"),
                    }}>
                        {MENU.map((item, i) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                end={item.end}
                                onMouseEnter={() => setHovIdx(i)}
                                onMouseLeave={() => setHovIdx(null)}
                                style={({ isActive }) => ({
                                    display       : "flex",
                                    alignItems    : "center",
                                    padding       : open ? "9px 11px" : "9px 0",
                                    justifyContent: open ? "flex-start" : "center",
                                    marginBottom  : 4,
                                    textDecoration: "none",
                                    borderRadius  : 16,
                                    transition    : T(),
                                    position      : "relative",
                                    /* Apple pill glass on active */
                                    background: isActive
                                        ? "linear-gradient(135deg, rgba(232,0,61,0.22) 0%, rgba(232,0,61,0.09) 100%)"
                                        : hovIdx === i
                                            ? "rgba(255,255,255,0.05)"
                                            : "transparent",
                                    border: isActive
                                        ? "1px solid rgba(232,0,61,0.38)"
                                        : hovIdx === i
                                            ? "1px solid rgba(255,255,255,0.08)"
                                            : "1px solid transparent",
                                    color: isActive
                                        ? "#fff"
                                        : hovIdx === i
                                            ? "rgba(255,255,255,0.8)"
                                            : "rgba(255,255,255,0.42)",
                                    backdropFilter: (isActive || hovIdx === i) ? "blur(8px)" : "none",
                                    animation: open ? `ps-slide ${0.28 + i * 0.04}s ease both` : "none",
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* icon badge */}
                                        <div style={{
                                            display        : "flex",
                                            alignItems     : "center",
                                            justifyContent : "center",
                                            width: 34, height: 34, flexShrink: 0,
                                            borderRadius: 12,
                                            background: isActive
                                                ? "linear-gradient(145deg, #e8003d, #b5002e)"
                                                : hovIdx === i
                                                    ? "rgba(232,0,61,0.14)"
                                                    : "rgba(255,255,255,0.06)",
                                            border: isActive
                                                ? "1px solid rgba(255,255,255,0.18)"
                                                : "1px solid rgba(255,255,255,0.05)",
                                            color: isActive
                                                ? "#fff"
                                                : hovIdx === i
                                                    ? "#e8003d"
                                                    : "rgba(255,255,255,0.5)",
                                            transition: T("background, box-shadow, color"),
                                            boxShadow : isActive
                                                ? "0 0 18px rgba(232,0,61,0.6), 0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                                                : hovIdx === i
                                                    ? "0 0 12px rgba(232,0,61,0.22)"
                                                    : "none",
                                        }}>
                                            <item.icon size={15} />
                                        </div>

                                        {/* label */}
                                        <span style={{
                                            marginLeft : open ? 12 : 0,
                                            fontSize   : 12,
                                            fontWeight : isActive ? 700 : 400,
                                            letterSpacing: "0.04em",
                                            whiteSpace : "nowrap",
                                            opacity    : open ? 1 : 0,
                                            maxWidth   : open ? 180 : 0,
                                            overflow   : "hidden",
                                            transition : T(),
                                        }}>
                                            {item.label}
                                        </span>

                                        {/* active pill dots */}
                                        {isActive && open && (
                                            <div style={{ marginLeft: "auto", display: "flex", gap: 4, flexShrink: 0 }}>
                                                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#e8003d", boxShadow: "0 0 5px #e8003d" }} />
                                                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                                            </div>
                                        )}

                                        {/* collapsed active nub */}
                                        {isActive && !open && (
                                            <div style={{
                                                position: "absolute", right: -1, top: "20%", height: "60%",
                                                width: 2.5, background: "#e8003d", borderRadius: 2,
                                                boxShadow: "0 0 8px rgba(232,0,61,1)",
                                            }} />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* ════════ BOTTOM ════════ */}
                    <div style={{
                        padding   : open ? "10px 10px 20px" : "10px 9px 20px",
                        borderTop : "1px solid rgba(255,255,255,0.06)",
                        transition: T("padding"),
                        flexShrink: 0,
                    }}>
                        {/* status row */}
                        <div style={{
                            display   : "flex", alignItems: "center", gap: 8,
                            padding   : "7px 11px", borderRadius: 14,
                            background: "rgba(255,255,255,0.04)",
                            border    : "1px solid rgba(255,255,255,0.07)",
                            marginBottom: 8,
                            opacity   : open ? 1 : 0,
                            transform : open ? "translateY(0)" : "translateY(10px)",
                            transition: T(),
                        }}>
                            <div style={{
                                width: 7, height: 7, borderRadius: "50%",
                                background: "#22c55e", boxShadow: "0 0 8px #22c55e",
                                flexShrink: 0, animation: "ps-dot 3s ease-in-out infinite",
                            }} />
                            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", flex: 1 }}>Online</span>
                            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>v2.4</span>
                        </div>

                        {/* logout */}
                        <button
                            onClick={handleLogout}
                            onMouseEnter={() => setLogHov(true)}
                            onMouseLeave={() => setLogHov(false)}
                            style={{
                                display        : "flex",
                                alignItems     : "center",
                                justifyContent : open ? "flex-start" : "center",
                                gap            : open ? 11 : 0,
                                width          : "100%",
                                padding        : open ? "9px 13px" : "9px 0",
                                borderRadius   : 14,
                                border         : "1px solid rgba(232,0,61,0.35)",
                                background     : logHov
                                    ? "linear-gradient(145deg, #e8003d, #b5002e)"
                                    : "rgba(232,0,61,0.08)",
                                color          : logHov ? "#fff" : "rgba(255,255,255,0.5)",
                                cursor         : "pointer",
                                transition     : T(),
                                boxShadow      : logHov ? "0 0 22px rgba(232,0,61,0.5), inset 0 1px 0 rgba(255,255,255,0.18)" : "none",
                                fontFamily     : '"Space Mono", monospace',
                                fontSize       : 11,
                                letterSpacing  : "0.06em",
                            }}
                        >
                            <LogOut size={14} style={{ flexShrink: 0 }} />
                            <span style={{
                                opacity   : open ? 1 : 0,
                                maxWidth  : open ? 180 : 0,
                                overflow  : "hidden",
                                whiteSpace: "nowrap",
                                transition: T(),
                            }}>
                                Logout
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── expand tab ── */}
                <div style={{
                    position   : "absolute", bottom: 110, right: -1,
                    width: 13, height: 30,
                    background : "linear-gradient(135deg, rgba(232,0,61,0.35), rgba(232,0,61,0.12))",
                    borderRadius: "0 8px 8px 0",
                    display    : "flex", alignItems: "center", justifyContent: "center",
                    opacity    : open ? 0 : 0.7,
                    transition : T("opacity"),
                    pointerEvents: "none",
                    boxShadow  : "2px 0 8px rgba(232,0,61,0.28)",
                }}>
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                        <path d="M2.5 2L6 5L2.5 8" stroke="#e8003d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </aside>
        </>
    );
}