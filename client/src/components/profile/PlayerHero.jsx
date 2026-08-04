import { motion } from 'framer-motion';
import ProfileAvatar from './ProfileAvatar';
import HeroInfo from './HeroInfo';
import HeroStats from './HeroStats';
import HeroActions from './HeroActions';
import FloatingParticles from '../ui/FloatingParticles';

export default function PlayerHero({ player }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileAvatar player={player} />

      <div
        className="player-hero-card"
        style={{
        position: 'relative', overflow: 'hidden',
        marginTop: 20, padding: '36px 40px',
        border: '1px solid rgba(232,0,61,0.18)',
        borderTop: '2px solid #e8003d',
        borderRadius: 22,
        background: 'rgba(7,0,10,0.72)',
        backdropFilter: 'blur(28px)',
        fontFamily: '"Space Mono", monospace',
        boxShadow: '0 0 48px rgba(232,0,61,0.08), 0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Particles */}
        <FloatingParticles count={18} color="#e8003d" opacity={0.3} speed={0.5} />

        {/* Dot grid */}
        <div
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'radial-gradient(rgba(192,192,192,0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }} />

        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(232,0,61,0.08)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Corner accents */}
        <div style={{ position: 'absolute', left: 16, top: 16, width: 22, height: 22, borderLeft: '2px solid #e8003d', borderTop: '2px solid #e8003d', borderRadius: '4px 0 0 0', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 16, bottom: 16, width: 22, height: 22, borderRight: '2px solid rgba(192,192,192,0.3)', borderBottom: '2px solid rgba(192,192,192,0.3)', borderRadius: '0 0 4px 0', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <HeroInfo player={player} />
          <HeroStats player={player} />
          <HeroActions player={player} />
        </div>
      </div>
    </motion.div>
  );
}