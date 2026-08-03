/**
 * StatCard — ElectricCard with TiltCard 3D effect + Sparkline trend
 */
import { motion } from "framer-motion";
import ElectricCard from "../ui/ElectricCard";
import TiltCard from "../ui/TiltCard";
import Sparkline from "../ui/Sparkline";

const ACCENT  = ['#e8003d', '#7c3aed'];
const ACCENT2 = ['#ff5530', '#c084fc'];
const TRENDS  = [
    [2, 4, 3, 5, 7, 6, 8, 9, 11, 14],
    [1, 3, 5, 4, 7, 9, 8, 11, 13, 16],
];

export default function StatCard({ title, value, icon, index = 0 }) {
    const accent  = ACCENT[index % 2];
    const accent2 = ACCENT2[index % 2];
    const trend   = TRENDS[index % 2];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <TiltCard maxTilt={7} scale={1.03} glare={true}>
                <ElectricCard
                    color={accent}
                    color2={accent2}
                    speed={6}
                    rounded={20}
                    gap={1.5}
                    glow={0.22}
                    style={{ fontFamily: '"Space Mono", monospace' }}
                >
                    <div style={{ position: 'relative', overflow: 'hidden', padding: '24px' }}>
                        {/* Dot grid */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }} />
                        {/* Corner triangle accent */}
                        <div style={{
                            position: 'absolute', top: 0, right: 0,
                            width: 0, height: 0,
                            borderTop: `44px solid ${accent}22`,
                            borderLeft: '44px solid transparent',
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                                <div>
                                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                                        {title}
                                    </p>
                                    <h2 style={{ marginTop: 12, fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                                        {value}
                                    </h2>
                                </div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: 46, height: 46, borderRadius: 14,
                                    border: `1px solid ${accent}55`,
                                    background: `${accent}1a`,
                                    color: accent, fontSize: 20, flexShrink: 0,
                                    boxShadow: `0 0 14px ${accent}33`,
                                }}>
                                    {icon}
                                </div>
                            </div>

                            {/* Bar + sparkline */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 16 }}>
                                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}88, transparent)`, borderRadius: 99 }} />
                                <Sparkline data={trend} color={accent} width={52} height={22} />
                            </div>
                        </div>
                    </div>
                </ElectricCard>
            </TiltCard>
        </motion.div>
    );
}