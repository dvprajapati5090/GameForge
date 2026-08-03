import { useState } from 'react';
import { motion } from 'framer-motion';
import usePlayers from '../hooks/usePlayers';
import useAuthStore from '../store/authStore';
import PlayerCard from '../components/players/PlayerCard';

export default function PlayersPage() {
  const { data, isLoading } = usePlayers();
  const [search, setSearch] = useState('');
  const user = useAuthStore((s) => s.user);
  const F = '"Space Mono", monospace';

  const players = (data?.data || []).filter(p => p.username !== user?.username);
  const filtered = players.filter(p => {
    const q = search.toLowerCase();
    return p.displayName?.toLowerCase().includes(q) || p.riotGameName?.toLowerCase().includes(q) || p.username?.toLowerCase().includes(q);
  });

  return (
    <div style={{ fontFamily: F, padding: '0 0 40px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>// ROSTER</p>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Players</h1>
        <p style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          {filtered.length} agent{filtered.length !== 1 ? 's' : ''} found
        </p>
      </motion.div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 32, maxWidth: 400 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>⌕</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, username, Riot ID..."
          style={{
            width: '100%', padding: '12px 16px 12px 38px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 10, color: '#fff', fontSize: 13, fontFamily: F, outline: 'none',
          }}
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh', fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          LOADING AGENTS...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16 }}>
          <p style={{ fontSize: 32, marginBottom: 16 }}>⌀</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>NO AGENTS FOUND</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map((player, i) => (
            <motion.div
              key={player._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <PlayerCard player={player} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}