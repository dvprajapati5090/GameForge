import { Users, Plus, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EmptyTeam() {
  const navigate = useNavigate();
  const F = '"Space Mono", monospace';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'relative', overflow: 'hidden',
          maxWidth: 560, width: '100%', padding: '56px 48px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, background: 'rgba(255,255,255,0.02)',
          fontFamily: F,
        }}
      >
        {/* Corner accents */}
        <div style={{ position: 'absolute', left: 16, top: 16, width: 20, height: 20, borderLeft: '1px solid rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', right: 16, bottom: 16, width: 20, height: 20, borderRight: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }} />

        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
          }}
        >
          <Users size={36} color="rgba(255,255,255,0.7)" />
        </motion.div>

        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>
          TEAM SYSTEM
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16 }}>
          No Team Found
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 360, margin: '0 auto 36px' }}>
          Build your own esports roster or accept an invitation from another captain to compete in tournaments.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            onClick={() => navigate('/team/create')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', background: '#fff', color: '#000',
              border: 'none', borderRadius: 10, fontSize: 13, fontFamily: F,
              fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em',
            }}
            whileHover={{ scale: 1.03, background: '#e8e8e8' }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={16} /> Create Team
          </motion.button>

          <motion.button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10,
              fontSize: 13, fontFamily: F, cursor: 'pointer', letterSpacing: '0.05em',
            }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={16} /> View Invitations
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}