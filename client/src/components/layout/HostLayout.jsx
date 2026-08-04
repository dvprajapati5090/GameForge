import { Outlet } from "react-router-dom";
import HostSidebar from "../host/HostSidebar";
import Navbar from "../dashboard/Navbar";
import MobileBottomNav from "./MobileBottomNav";
import "../../styles/mobile.css";

// ── Same black hole video as landing page hero ─────────────────────────────
const BG_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export default function HostLayout() {
    return (
        <div className="relative h-screen overflow-hidden text-white"
            style={{ background: '#07000a', fontFamily: '"Space Mono", monospace' }}
        >
            {/* ── Background video — more visible ── */}
            <video
                autoPlay loop muted playsInline
                preload="none"
                src={BG_VIDEO}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    zIndex: 0, opacity: 0.55,
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                }}
            />
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                background: 'linear-gradient(135deg, rgba(7,0,10,0.42) 0%, rgba(14,0,20,0.30) 50%, rgba(7,0,10,0.45) 100%)',
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 2,
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.08) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }} />
            <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
                zIndex: 3, height: 2,
                background: '#e8003d',
                boxShadow: '0 0 24px rgba(232,0,61,1), 0 0 48px rgba(232,0,61,0.5)',
            }} />

            {/* Sidebar — hidden on mobile via .host-sidebar class in mobile.css */}
            <div className="host-sidebar">
                <HostSidebar />
            </div>

            {/* Main — offset by icon rail (64px) on desktop, 0 on mobile */}
            <div className="relative flex h-screen flex-col main-content-offset" style={{ marginLeft: 64, zIndex: 10 }}>
                <Navbar />
                <main className="relative flex-1 overflow-y-auto p-6 main-scroll-area"
                    style={{ fontFamily: '"Space Mono", monospace', contain: 'layout style paint' }}>
                    <div className="relative z-10">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile bottom navigation — only visible on screens ≤ 768px */}
            <MobileBottomNav isHost={true} />
        </div>
    );
}