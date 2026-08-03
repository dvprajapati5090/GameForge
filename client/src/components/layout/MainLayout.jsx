import { Outlet } from "react-router-dom";
import PlayerSidebar from "../dashboard/PlayerSidebar";
import Navbar from "../dashboard/Navbar";

// ── Same black hole video as landing page hero ─────────────────────────────
const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4";
export default function MainLayout() {
  return (
    <div
      className="relative h-screen overflow-hidden text-white"
      style={{ background: "#07000a", fontFamily: '"Space Mono", monospace' }}
    >
      {/* ── Background video — more visible, aesthetic ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src={BG_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: 0.55 }}
      />
      {/* Cinematic tint — lighter so video breathes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(135deg, rgba(7,0,10,0.42) 0%, rgba(14,0,20,0.30) 50%, rgba(7,0,10,0.45) 100%)",
        }}
      />
      {/* Dot grid floats above video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            "radial-gradient(rgba(192,192,192,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Neon red top stripe */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 3,
          height: 2,
          background: "#e8003d",
          boxShadow: "0 0 24px rgba(232,0,61,1), 0 0 48px rgba(232,0,61,0.5)",
        }}
      />

      <PlayerSidebar />
      {/* Main — always offset by collapsed sidebar width (64px) */}
      <div
        className="relative flex h-screen flex-col"
        style={{ marginLeft: 64, zIndex: 10 }}
      >
        <Navbar />
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ background: "transparent" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
