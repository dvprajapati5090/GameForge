/**
 * NotFound — 404 gaming glass error page
 */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, RotateCcw, Gamepad2 } from "lucide-react";
import FloatingParticles from "../components/ui/FloatingParticles";

const F = '"Space Mono", monospace';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#07000a",
            fontFamily: F,
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Background particles */}
            <FloatingParticles count={40} color="#e8003d" opacity={0.3} speed={0.5} />

            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(rgba(192,192,192,0.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
            }} />

            {/* Top red stripe */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "#e8003d", boxShadow: "0 0 24px rgba(232,0,61,1), 0 0 48px rgba(232,0,61,0.5)", pointerEvents: "none",
            }} />

            {/* Center glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(232,0,61,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                style={{
                    position: "relative", zIndex: 10,
                    textAlign: "center", maxWidth: 480, padding: "0 24px",
                }}
            >
                {/* 404 glitching number */}
                <div style={{ position: "relative", marginBottom: 24 }}>
                    <motion.h1
                        animate={{ textShadow: [
                            "0 0 40px rgba(232,0,61,0.6)",
                            "4px 0 0 rgba(0,255,255,0.4), -4px 0 0 rgba(232,0,61,0.6)",
                            "0 0 40px rgba(232,0,61,0.6)",
                            "-2px 0 0 rgba(0,255,255,0.3), 2px 0 0 rgba(232,0,61,0.5)",
                            "0 0 40px rgba(232,0,61,0.6)",
                        ]}}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            fontSize: "clamp(96px, 18vw, 160px)",
                            fontWeight: 700, color: "#fff",
                            letterSpacing: "-0.06em", lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        404
                    </motion.h1>

                    {/* Red underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ height: 2, background: "linear-gradient(to right, transparent, #e8003d, transparent)", margin: "8px auto 0" }}
                    />
                </div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
                        background: "rgba(232,0,61,0.12)", border: "1px solid rgba(232,0,61,0.4)",
                        padding: "5px 16px", borderRadius: 999,
                    }}
                >
                    <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8003d" }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#e8003d", letterSpacing: "0.22em" }}>PAGE NOT FOUND</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 12 }}
                >
                    You're Off The Map
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: 12, color: "rgba(192,192,192,0.5)", lineHeight: 1.8, marginBottom: 40, letterSpacing: "0.04em" }}
                >
                    This page doesn't exist in our arena.<br />
                    Head back to safety before the countdown ends.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
                >
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "12px 24px", borderRadius: 12,
                            background: "#e8003d", border: "none",
                            color: "#fff", fontSize: 11, fontWeight: 700,
                            fontFamily: F, cursor: "pointer",
                            letterSpacing: "0.08em", textTransform: "uppercase",
                            boxShadow: "0 0 20px rgba(232,0,61,0.5)",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(232,0,61,0.7)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 20px rgba(232,0,61,0.5)"; }}
                    >
                        <Home size={14} /> Return Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "12px 24px", borderRadius: 12,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(192,192,192,0.25)",
                            color: "#C0C0C0", fontSize: 11, fontWeight: 700,
                            fontFamily: F, cursor: "pointer",
                            letterSpacing: "0.08em", textTransform: "uppercase",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,0,61,0.5)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(192,192,192,0.25)"; e.currentTarget.style.color = "#C0C0C0"; }}
                    >
                        <RotateCcw size={14} /> Go Back
                    </button>
                </motion.div>

                {/* Gamepad icon decor */}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0], y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginTop: 48, opacity: 0.15 }}
                >
                    <Gamepad2 size={48} color="#e8003d" style={{ margin: "0 auto" }} />
                </motion.div>
            </motion.div>
        </div>
    );
}
