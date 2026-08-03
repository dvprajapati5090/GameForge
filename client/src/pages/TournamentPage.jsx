import { motion } from 'framer-motion';
import useTournaments from '../hooks/useTournaments';
import TournamentCard from '../components/tournaments/TournamentCard';
import TournamentFilters from '../components/tournaments/TournamentFilters';
import EmptyTournament from '../components/tournaments/EmptyTournament';
import FeaturedTournament from '../components/tournaments/FeaturedTournament';

export default function TournamentPage() {
  const { data, isLoading } = useTournaments();
  const F = '"Space Mono", monospace';

  if (isLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
      LOADING TOURNAMENTS...
    </div>
  );

  const tournaments = data?.data?.tournaments || [];

  return (
    <div style={{ fontFamily: F, maxWidth: 1200, margin: '0 auto', padding: '0 0 48px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>// COMPETITIVE</p>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Tournaments</h1>
        <p style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          {tournaments.length} active event{tournaments.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {/* Featured */}
      {tournaments.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <FeaturedTournament tournament={tournaments[0]} />
        </div>
      )}

      <TournamentFilters />

      {tournaments.length === 0 ? (
        <EmptyTournament />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 24 }}>
          {tournaments.map((t, i) => (
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