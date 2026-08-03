/**
 * AboutCard — Electric border, glass frosted, gaming theme
 */
import { Quote, User } from 'lucide-react';
import ElectricCard from '../ui/ElectricCard';

const F = '"Space Mono", monospace';

export default function AboutCard({ player }) {
    return (
        <ElectricCard
            color="#7c3aed"
            color2="#c084fc"
            speed={7}
            rounded={18}
            gap={1.5}
            glow={0.18}
            style={{ fontFamily: F }}
        >
            <div style={{ padding: 26, position: 'relative', overflow: 'hidden' }}>
                {/* Subtle grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'radial-gradient(rgba(124,58,237,0.06) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: 10,
                            background: 'rgba(124,58,237,0.2)',
                            border: '1px solid rgba(124,58,237,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <User size={14} color="#c084fc" />
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                            About Me
                        </h2>
                    </div>

                    <Quote size={26} color="rgba(124,58,237,0.35)" style={{ marginBottom: 10 }} />

                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.52)', lineHeight: 1.85, minHeight: 76 }}>
                        {player?.bio || 'No bio added yet. Tell the community about yourself.'}
                    </p>

                    <div style={{
                        marginTop: 22, paddingTop: 18,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', justifyContent: 'space-between',
                        fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em',
                    }}>
                        <span>JOINED GAMEFORGE</span>
                        <span>2026</span>
                    </div>
                </div>
            </div>
        </ElectricCard>
    );
}