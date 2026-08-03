import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Trophy, Users, Shield, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useEffect } from "react";
import SpecularButton from "../ui/SpecularButton";
import FloatingParticles from "../ui/FloatingParticles";
import TypewriterText from "../ui/TypewriterText";

/* ── Framer-motion count-up ── */
function Counter({ raw, suffix = '', duration = 1.5 }) {
  const count   = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (suffix === 'K')  return (v / 1000).toFixed(1) + 'K';
    if (suffix === '+')  return Math.floor(v) + '+';
    return Math.floor(v);
  });
  useEffect(() => {
    const controls = animate(count, raw, { duration });
    return controls.stop;
  }, [raw]);
  return <motion.span>{rounded}</motion.span>;
}

const METRICS = [
  { icon: Trophy, raw: 120,  suffix: '+',  label: 'Active Tournaments', accent: '#e8003d',  accent2: '#ff5530' },
  { icon: Users,  raw: 8500, suffix: 'K',  label: 'Registered Players',  accent: '#7c3aed',  accent2: '#c084fc' },
  { icon: Shield, raw: 410,  suffix: '',   label: 'Competitive Teams',   accent: '#e8003d',  accent2: '#ff5530' },
];

const TYPEWRITER_PHRASES = [
  "Your Competitive Arena.",
  "Where Champions Rise.",
  "Forge Your Legacy.",
  "Dominate The Bracket.",
];

export default function HeroBanner() {
  const navigate = useNavigate();
  const user     = useAuthStore((s) => s.user);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid rgba(192,192,192,0.12)',
        borderTop: '2px solid #e8003d',
        background: 'rgba(7,0,10,0.72)',
        backdropFilter: 'blur(28px)',
        borderRadius: 24,
        fontFamily: '"Space Mono", monospace',
        boxShadow: '0 0 64px rgba(232,0,61,0.1), 0 24px 80px rgba(0,0,0,0.6)',
      }}
    >
      {/* Floating particles */}
      <FloatingParticles count={28} color="#e8003d" opacity={0.45} speed={0.7} />
      <FloatingParticles count={14} color="#7c3aed" opacity={0.25} speed={0.4} />

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'radial-gradient(rgba(192,192,192,0.1) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient red glow */}
      <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(232,0,61,0.08)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', left: 14, top: 14, width: 20, height: 20, borderLeft: '2px solid #e8003d', borderTop: '2px solid #e8003d', borderRadius: '4px 0 0 0', zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 14, bottom: 14, width: 20, height: 20, borderRight: '2px solid rgba(192,192,192,0.4)', borderBottom: '2px solid rgba(192,192,192,0.4)', borderRadius: '0 0 4px 0', zIndex: 2 }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '48px', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left */}
        <div style={{ flex: '1 1 320px' }}>

          {/* Pulsing badge */}
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,0,61,0.15)', border: '1px solid rgba(232,0,61,0.4)', padding: '5px 14px', marginBottom: 20, borderRadius: 999, boxShadow: '0 0 16px rgba(232,0,61,0.25)' }}
            animate={{ boxShadow: ['0 0 16px rgba(232,0,61,0.2)', '0 0 28px rgba(232,0,61,0.4)', '0 0 16px rgba(232,0,61,0.2)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8003d' }}
            />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#e8003d', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Premium Esports Platform
            </span>
          </motion.div>

          {/* Greeting */}
          <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 8 }}>
            Welcome back,
          </h1>
          <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 8,
            background: 'linear-gradient(90deg, #e8003d 0%, #ff6030 50%, #e8003d 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block',
                background: 'linear-gradient(90deg, #e8003d 0%, #ff8060 40%, #ff3060 70%, #e8003d 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              {user?.displayName || user?.username || 'Agent'}.
            </motion.span>
          </h1>

          {/* Typewriter tagline */}
          <div style={{ fontSize: 14, color: 'rgba(192,192,192,0.7)', marginBottom: 24, minHeight: 22 }}>
            <TypewriterText
              texts={TYPEWRITER_PHRASES}
              speed={55}
              pauseMs={2000}
              deleteMs={28}
              cursorColor="#e8003d"
            />
          </div>

          <p style={{ fontSize: 11, color: 'rgba(192,192,192,0.45)', lineHeight: 1.9, maxWidth: 400, marginBottom: 32 }}>
            Forge your competitive legacy with elite tournaments, powerful teams, and an immersive esports ecosystem built for champions.
          </p>

          <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.3), transparent)', marginBottom: 28 }} />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <SpecularButton variant="red" size="md" onClick={() => navigate('/tournaments')} icon={<ArrowRight size={13} />}>
              Join Tournament
            </SpecularButton>
            <SpecularButton variant="silver" size="md" onClick={() => navigate('/team')}>
              Explore Teams
            </SpecularButton>
          </div>
        </div>

        {/* Right — metric cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '0 0 260px' }}>
          {METRICS.map((m, i) => {
            const isRed = m.accent === '#e8003d';
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ x: -5, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 16,
                  border: `1px solid ${m.accent}33`,
                  borderLeft: `3px solid ${m.accent}`,
                  background: `${m.accent}0d`,
                  backdropFilter: 'blur(12px)',
                  cursor: 'default',
                  boxShadow: `0 0 20px ${m.accent}0f`,
                }}
              >
                <div style={{
                  width: 40, height: 40, flexShrink: 0, borderRadius: 12,
                  background: `${m.accent}22`,
                  border: `1px solid ${m.accent}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: m.accent,
                  boxShadow: `0 0 12px ${m.accent}30`,
                }}>
                  <m.icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                    <Counter raw={m.raw} suffix={m.suffix} />
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(192,192,192,0.6)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</p>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                  style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: '0.14em',
                    borderRadius: 999,
                    background: isRed ? '#e8003d' : m.accent,
                    color: '#fff', padding: '3px 9px', flexShrink: 0,
                    boxShadow: `0 0 8px ${m.accent}80`,
                  }}
                >
                  LIVE
                </motion.div>
              </motion.div>
            );
          })}

          {/* Extra: XP / streak chip */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 14,
              border: '1px solid rgba(255,200,0,0.2)',
              background: 'rgba(255,200,0,0.05)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Zap size={16} color="#ffc107" fill="#ffc107" />
            </motion.div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#ffc107' }}>Daily Streak Active</p>
              <p style={{ fontSize: 9, color: 'rgba(255,193,7,0.5)', marginTop: 2, letterSpacing: '0.06em' }}>Play today to keep your streak</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}