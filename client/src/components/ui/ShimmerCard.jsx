/**
 * ShimmerCard — Animated skeleton loader matching the gaming glass theme
 *
 * Props:
 *   height  — card height (default 120)
 *   rounded — border-radius (default 22)
 *   lines   — number of shimmer lines (default 3)
 */
import { motion } from "framer-motion";

const shimmerKeyframes = `
@keyframes shimmer-sweep {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}
`;

function ShimmerLine({ width = "100%", height = 10, delay = 0, rounded = 6 }) {
    return (
        <div style={{
            width, height,
            borderRadius: rounded,
            background: "rgba(255,255,255,0.05)",
            overflow: "hidden",
            position: "relative",
            marginBottom: 10,
        }}>
            <div style={{
                position: "absolute", inset: 0,
                animation: `shimmer-sweep 1.6s ${delay}s ease-in-out infinite`,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            }} />
        </div>
    );
}

export default function ShimmerCard({ height = 120, rounded = 22, lines = 3, style = {} }) {
    return (
        <>
            <style>{shimmerKeyframes}</style>
            <div style={{
                height,
                borderRadius: rounded,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(8,2,14,0.7)",
                backdropFilter: "blur(16px)",
                padding: "20px 22px",
                overflow: "hidden",
                ...style,
            }}>
                {/* Icon placeholder */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.05)", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                        <div style={{ position: "absolute", inset: 0, animation: "shimmer-sweep 1.6s 0.1s ease-in-out infinite", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }} />
                    </div>
                    <ShimmerLine width="40%" height={12} delay={0.05} />
                </div>
                {Array.from({ length: lines }).map((_, i) => (
                    <ShimmerLine
                        key={i}
                        width={i === lines - 1 ? "60%" : "100%"}
                        height={i === 0 ? 28 : 9}
                        delay={0.1 + i * 0.08}
                        rounded={i === 0 ? 8 : 5}
                    />
                ))}
            </div>
        </>
    );
}

/** Grid of shimmer cards for loading states */
export function ShimmerGrid({ count = 4, columns = 4 }) {
    return (
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: count }).map((_, i) => (
                <ShimmerCard key={i} height={140} style={{ animationDelay: `${i * 0.06}s` }} />
            ))}
        </div>
    );
}
