import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Search, ChevronUp, ChevronDown, Minus, Crown, Flame, Zap } from 'lucide-react';
import useLeaderboard from '../hooks/useLeaderboard';
import useDebounce from '../hooks/useDebounce';
import FloatingParticles from '../components/ui/FloatingParticles';
import { ShimmerGrid } from '../components/ui/ShimmerCard';
import Sparkline from '../components/ui/Sparkline';

const F = '"Space Mono", monospace';

const SORT_OPTIONS = [
  { value: 'stats.wins',          label: 'Wins',          icon: Trophy },
  { value: 'stats.losses',        label: 'Losses',        icon: Flame },
  { value: 'stats.matchesPlayed', label: 'Matches',       icon: Zap },
  { value: 'stats.championships', label: 'Championships', icon: Crown },
  { value: 'winRate',             label: 'Win Rate',      icon: Zap },
];

/* Rank badge with medal icons for top 3 */
function RankBadge({ rank }) {
  if (rank === 1) return (
    <motion.div
      animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{ fontSize: 22, filter: 'drop-shadow(0 0 8px rgba(255,193,7,0.8))' }}
    >🥇</motion.div>
  );
  if (rank === 2) return (
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3.5, repeat: Infinity }}
      style={{ fontSize: 22, filter: 'drop-shadow(0 0 6px rgba(192,192,192,0.7))' }}
    >🥈</motion.div>
  );
  if (rank === 3) return (
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{ fontSize: 22, filter: 'drop-shadow(0 0 5px rgba(205,127,50,0.6))' }}
    >🥉</motion.div>
  );
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(255,255,255,0.04)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700,
      fontFamily: F,
    }}>
      {rank}
    </div>
  );
}

/* Win rate indicator bar */
function WinRateBar({ rate }) {
  const pct = Math.min(parseFloat(rate) || 0, 100);
  const color = pct >= 70 ? '#22c55e' : pct >= 50 ? '#ffc107' : pct >= 30 ? '#ff9020' : '#e8003d';
  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 4, textAlign: 'center' }}>{rate}%</div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 99, background: `linear-gradient(to right, ${color}, ${color}88)`, boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort]     = useState('stats.wins');
  const [searchFocus, setSearchFocus] = useState(false);
  const debouncedSearch     = useDebounce(search, 400);
  const { data, isLoading } = useLeaderboard({ search: debouncedSearch, sort });

  if (isLoading) return (
    <div style={{ fontFamily: F, maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ height: 44, width: 240, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
      </div>
      <ShimmerGrid count={8} columns={1} />
    </div>
  );

  const players = data?.data?.players || [];

  return (
    <div style={{ fontFamily: F, maxWidth: 1200, margin: '0 auto', padding: '8px 0 48px', position: 'relative' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 32, position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(232,0,61,0.2)', borderTop: '2px solid #e8003d',
          background: 'rgba(7,0,10,0.72)', backdropFilter: 'blur(24px)',
          borderRadius: 22, padding: '36px 40px',
          boxShadow: '0 0 48px rgba(232,0,61,0.1), 0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <FloatingParticles count={20} color="#e8003d" opacity={0.35} speed={0.6} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(192,192,192,0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <motion.div
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,0,61,0.15)', border: '1px solid rgba(232,0,61,0.4)', padding: '5px 14px', marginBottom: 14, borderRadius: 999 }}
              animate={{ boxShadow: ['0 0 12px rgba(232,0,61,0.2)', '0 0 24px rgba(232,0,61,0.4)', '0 0 12px rgba(232,0,61,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8003d' }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: '#e8003d', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Live Rankings</span>
            </motion.div>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>
              Leaderboard
            </h1>
            <p style={{ fontSize: 11, color: 'rgba(192,192,192,0.5)', letterSpacing: '0.06em' }}>
              Top players across all GameForge tournaments
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trophy size={20} color="#ffc107" />
            <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{players.length}</span>
            <span style={{ fontSize: 11, color: 'rgba(192,192,192,0.5)', letterSpacing: '0.08em' }}>RANKED PLAYERS</span>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: searchFocus ? '#e8003d' : 'rgba(255,255,255,0.3)', transition: 'color 0.2s', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            placeholder="Search players..."
            style={{
              width: '100%', padding: '11px 16px 11px 40px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${searchFocus ? 'rgba(232,0,61,0.5)' : 'rgba(255,255,255,0.09)'}`,
              boxShadow: searchFocus ? '0 0 12px rgba(232,0,61,0.15)' : 'none',
              borderRadius: 12, color: '#fff', fontSize: 12, fontFamily: F, outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>
        {/* Sort tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '9px 14px', borderRadius: 10,
                border: `1px solid ${sort === opt.value ? 'rgba(232,0,61,0.5)' : 'rgba(255,255,255,0.09)'}`,
                background: sort === opt.value ? 'rgba(232,0,61,0.12)' : 'rgba(255,255,255,0.03)',
                color: sort === opt.value ? '#e8003d' : 'rgba(255,255,255,0.4)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                cursor: 'pointer', fontFamily: F,
                transition: 'all 0.18s ease',
                boxShadow: sort === opt.value ? '0 0 12px rgba(232,0,61,0.15)' : 'none',
              }}
            >
              <opt.icon size={11} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {players.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '80px 24px',
            border: '1px dashed rgba(232,0,61,0.2)', borderRadius: 22,
            background: 'rgba(232,0,61,0.03)',
          }}
        >
          <Trophy size={40} color="rgba(232,0,61,0.3)" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>No players found</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20,
            overflow: 'hidden',
            background: 'rgba(7,0,10,0.65)', backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
          }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '56px 1fr 110px 80px 80px 140px 90px',
            padding: '14px 24px', alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.025)',
          }}>
            {['#', 'PLAYER', 'RANK', 'WINS', 'LOSS', 'WIN RATE', 'TITLES'].map(h => (
              <span key={h} style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textAlign: h === '#' || h === 'PLAYER' ? 'left' : 'center', fontWeight: 700 }}>
                {h}
              </span>
            ))}
          </div>

          {players.map((player, i) => {
            const isTop3 = i < 3;
            const highlight = i === 0 ? 'rgba(255,193,7,0.04)' : i === 1 ? 'rgba(192,192,192,0.025)' : i === 2 ? 'rgba(205,127,50,0.03)' : 'transparent';

            return (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ background: 'rgba(232,0,61,0.04)', x: 2, transition: { duration: 0.15 } }}
                style={{
                  display: 'grid', gridTemplateColumns: '56px 1fr 110px 80px 80px 140px 90px',
                  padding: '14px 24px', alignItems: 'center',
                  borderBottom: i < players.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: highlight,
                  cursor: 'pointer',
                  borderLeft: isTop3 ? `2px solid ${i === 0 ? '#ffc107' : i === 1 ? '#C0C0C0' : '#cd7f32'}` : '2px solid transparent',
                }}
              >
                <div style={{ display: 'flex' }}><RankBadge rank={player.rank} /></div>

                <Link to={`/players/${player.username}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                  {player.avatar ? (
                    <img src={player.avatar} alt={player.displayName}
                      style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'cover', border: `1.5px solid ${isTop3 ? (i===0?'#ffc107':i===1?'#C0C0C0':'#cd7f32') : 'rgba(255,255,255,0.1)'}` }} />
                  ) : (
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(232,0,61,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#e8003d', border: '1.5px solid rgba(232,0,61,0.35)', flexShrink: 0 }}>
                      {player.displayName?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{player.displayName}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>@{player.username}</p>
                  </div>
                </Link>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 9, padding: '4px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>
                    {player.highestRank || 'UNRANKED'}
                  </span>
                </div>

                <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#22c55e' }}>{player.stats?.wins ?? 0}</div>
                <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#e8003d' }}>{player.stats?.losses ?? 0}</div>

                <div style={{ padding: '0 8px' }}>
                  <WinRateBar rate={player.winRate} />
                </div>

                <div style={{ textAlign: 'center', fontSize: 13, color: '#ffc107', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  🏆 {player.stats?.championships ?? 0}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
