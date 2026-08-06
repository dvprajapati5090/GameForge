import { useState } from 'react';
import { motion } from 'framer-motion';
import useTournaments from '../hooks/useTournaments';
import TournamentCard from '../components/tournaments/TournamentCard';
import TournamentFilters from '../components/tournaments/TournamentFilters';
import EmptyTournament from '../components/tournaments/EmptyTournament';
import FeaturedTournament from '../components/tournaments/FeaturedTournament';

export default function TournamentPage() {
  const { data, isLoading } = useTournaments();
  const F = '"Space Mono", monospace';

  // Search + game filter state — same pattern as PlayersPage
  const [search, setSearch] = useState('');
  const [gameFilter, setGameFilter] = useState('All');

  if (isLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
      LOADING TOURNAMENTS...
    </div>
  );

  const tournaments = data?.data?.tournaments || [];

  // Filter tournaments by search query and game
  const filtered = tournaments.filter(t => {
    const q = search.toLowerCase();
    const matchesSearch =
      t.name?.toLowerCase().includes(q) ||
      t.game?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q);
    const matchesGame =
      gameFilter === 'All' || t.game === gameFilter;
    return matchesSearch && matchesGame;
  });

  return (
    <div style={{ fontFamily: F, maxWidth: 1200, margin: '0 auto', padding: '0 0 48px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>// COMPETITIVE</p>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Tournaments</h1>
        <p style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          {filtered.length} active event{filtered.length !== 1 ? 's' : ''}
          {search || gameFilter !== 'All' ? ` matching your filter` : ''}
        </p>
      </motion.div>

      {/* Featured — only show when no active filters */}
      {tournaments.length > 0 && !search && gameFilter === 'All' && (
        <div style={{ marginBottom: 32 }}>
          <FeaturedTournament tournament={tournaments[0]} />
        </div>
      )}

      {/* Search & Filters */}
      <div style={{ marginBottom: 24 }}>
        <TournamentFilters
          search={search}
          setSearch={setSearch}
          gameFilter={gameFilter}
          setGameFilter={setGameFilter}
        />
      </div>

      {filtered.length === 0 ? (
        search || gameFilter !== 'All' ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16 }}>
            <p style={{ fontSize: 32, marginBottom: 16 }}>⌀</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>NO TOURNAMENTS FOUND</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>Try adjusting your search or filter</p>
          </div>
        ) : (
          <EmptyTournament />
        )
      ) : (
        <div className="tournament-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <TournamentCard tournament={t} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}