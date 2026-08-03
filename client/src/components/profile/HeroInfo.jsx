/**
 * HeroInfo — Player profile hero info section (gaming glass theme)
 * Upgraded from Tailwind className approach to inline Space Mono gaming styles
 */
import { motion } from "framer-motion";
import RiotIdentityCard from "./RiotIdentityCard";

const RANK_ACCENT = (rank = "") => {
    const r = rank.toUpperCase();
    if (r.includes("RADIANT"))   return { color: "#ffc107", glow: "rgba(255,193,7,0.4)" };
    if (r.includes("IMMORTAL"))  return { color: "#e8003d", glow: "rgba(232,0,61,0.4)" };
    if (r.includes("ASCENDANT")) return { color: "#22c55e", glow: "rgba(34,197,94,0.35)" };
    if (r.includes("DIAMOND"))   return { color: "#818cf8", glow: "rgba(129,140,248,0.35)" };
    if (r.includes("PLATINUM"))  return { color: "#22d3ee", glow: "rgba(34,211,238,0.35)" };
    if (r.includes("GOLD"))      return { color: "#fbbf24", glow: "rgba(251,191,36,0.35)" };
    if (r.includes("SILVER"))    return { color: "#C0C0C0", glow: "rgba(192,192,192,0.3)" };
    if (r.includes("BRONZE"))    return { color: "#cd7f32", glow: "rgba(205,127,50,0.3)" };
    return { color: "#6b7280", glow: "rgba(107,114,128,0.2)" };
};

export default function HeroInfo({ player }) {
    const profile = player;
    const { color: rankColor, glow: rankGlow } = RANK_ACCENT(profile?.currentRank);

    return (
        <div style={{ textAlign: "center", fontFamily: '"Space Mono", monospace' }}>
            {/* Eyebrow label */}
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.32em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 12 }}
            >
                GAMEFORGE PLAYER
            </motion.p>

            {/* Display Name — animated red gradient */}
            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ fontSize: "clamp(32px,6vw,64px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}
            >
                <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{
                        display: "inline-block",
                        background: "linear-gradient(90deg, #e8003d 0%, #ff8060 30%, #fff 55%, #ff3060 80%, #e8003d 100%)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {profile?.displayName || "Anonymous"}
                </motion.span>
            </motion.h1>

            {/* Riot identity card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <RiotIdentityCard player={profile} />
            </motion.div>

            {/* Rank + RR chips */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 20 }}
            >
                {/* Rank chip */}
                <motion.div
                    whileHover={{ scale: 1.06, rotate: -1 }}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px", borderRadius: 999,
                        background: `linear-gradient(135deg, ${rankColor}22 0%, ${rankColor}0d 100%)`,
                        border: `1px solid ${rankColor}60`,
                        boxShadow: `0 0 18px ${rankGlow}`,
                        cursor: "default",
                    }}
                >
                    <span style={{ fontSize: 16 }}>🏆</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: rankColor, letterSpacing: "0.06em" }}>
                        {profile?.currentRank || "UNRANKED"}
                    </span>
                </motion.div>

                {/* RR chip */}
                <motion.div
                    whileHover={{ scale: 1.06 }}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px", borderRadius: 999,
                        background: "rgba(124,58,237,0.12)",
                        border: "1px solid rgba(124,58,237,0.35)",
                        boxShadow: "0 0 14px rgba(124,58,237,0.2)",
                        cursor: "default",
                    }}
                >
                    <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        ⚡
                    </motion.span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.06em" }}>
                        {profile?.rankRating ?? 0} RR
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}