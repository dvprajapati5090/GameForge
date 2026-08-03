/**
 * HeroStats — Gaming glass stat tiles for the Player Profile hero section
 * Replaces Tailwind GlowCard approach with inline Space Mono / red-silver gaming theme
 */
import { motion } from "framer-motion";
import { Trophy, BarChart3, Star, Swords } from "lucide-react";
import TiltCard from "../ui/TiltCard";
import ProgressRing from "../ui/ProgressRing";

const STAT_META = (user) => [
    {
        icon: Trophy,
        title: "Current Rank",
        value: user?.currentRank || "UNRANKED",
        subtitle: "Competitive Tier",
        accent: "#ffc107",
        ringValue: getRankPct(user?.currentRank),
    },
    {
        icon: BarChart3,
        title: "Rank Rating",
        value: `${user?.rankRating ?? 0} RR`,
        subtitle: "Current Season",
        accent: "#7c3aed",
        ringValue: Math.min((user?.rankRating ?? 0) / 100, 100),
    },
    {
        icon: Star,
        title: "Peak Rank",
        value: user?.highestRank || "N/A",
        subtitle: "Best Achievement",
        accent: "#e8003d",
        ringValue: 75,
    },
    {
        icon: Swords,
        title: "Account Level",
        value: user?.accountLevel ?? 0,
        subtitle: "Overall Progress",
        accent: "#22c55e",
        ringValue: Math.min(((user?.accountLevel ?? 0) / 500) * 100, 100),
    },
];

function getRankPct(rank) {
    if (!rank) return 5;
    const tiers = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "ASCENDANT", "IMMORTAL", "RADIANT"];
    const match = tiers.findIndex(t => rank.toUpperCase().includes(t));
    return match < 0 ? 5 : Math.round(((match + 1) / tiers.length) * 100);
}

export default function HeroStats({ player }) {
    const stats = STAT_META(player);

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 14,
            marginTop: 24,
        }}>
            {stats.map((card, i) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                        <TiltCard maxTilt={7} scale={1.03} glare>
                            <div style={{
                                position: "relative", overflow: "hidden",
                                border: `1px solid ${card.accent}25`,
                                borderTop: `2px solid ${card.accent}`,
                                background: "rgba(8,2,14,0.82)",
                                backdropFilter: "blur(20px)",
                                borderRadius: 18,
                                padding: "20px",
                                fontFamily: '"Space Mono", monospace',
                                boxShadow: `0 0 24px ${card.accent}10, 0 12px 40px rgba(0,0,0,0.45)`,
                            }}>
                                {/* Dot grid */}
                                <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                                    backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
                                    backgroundSize: "18px 18px",
                                }} />
                                {/* Glow blob */}
                                <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${card.accent}15`, filter: "blur(24px)", pointerEvents: "none" }} />

                                <div style={{ position: "relative", zIndex: 1 }}>
                                    {/* Top: icon box + progress ring */}
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                                        <div style={{
                                            width: 42, height: 42, borderRadius: 12,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            background: `${card.accent}15`, border: `1px solid ${card.accent}40`,
                                            color: card.accent, boxShadow: `0 0 12px ${card.accent}25`,
                                        }}>
                                            <Icon size={20} />
                                        </div>
                                        <ProgressRing
                                            value={card.ringValue}
                                            max={100}
                                            size={44}
                                            stroke={4}
                                            color={card.accent}
                                            label={null}
                                            sublabel={null}
                                            animate
                                        />
                                    </div>

                                    {/* Label */}
                                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
                                        {card.title}
                                    </p>
                                    {/* Value */}
                                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>
                                        {card.value}
                                    </h3>
                                    <p style={{ fontSize: 9, color: "rgba(192,192,192,0.38)", letterSpacing: "0.06em" }}>
                                        {card.subtitle}
                                    </p>

                                    {/* Bottom accent bar */}
                                    <div style={{ marginTop: 14, height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.max(card.ringValue, 15)}%` }}
                                            transition={{ duration: 1.1, delay: 0.3 + i * 0.08 }}
                                            style={{ height: "100%", borderRadius: 99, background: `linear-gradient(to right, ${card.accent}, ${card.accent}66)`, boxShadow: `0 0 6px ${card.accent}` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                );
            })}
        </div>
    );
}