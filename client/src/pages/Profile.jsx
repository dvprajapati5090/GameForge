import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import PlayerHero from '../components/profile/PlayerHero';
import AccountCard from '../components/profile/AccountCard';
import AboutCard from '../components/profile/AboutCard';
import FavouriteGamesCard from '../components/profile/FavouriteGamesCard';
import CareerStats from '../components/profile/CareerStats';
import usePlayerCareer from '../hooks/usePlayerCareer';
import AchievementsSection from '../components/profile/AchievementsSection';

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = usePlayerCareer(user?._id);
  const F = '"Space Mono", monospace';

  return (
    <div style={{ fontFamily: F, padding: '0 0 48px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 6 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>
          // AGENT FILE
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <PlayerHero player={user} />

        {isLoading ? (
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '28px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 13, letterSpacing: '0.1em' }}>
            LOADING CAREER DATA...
          </div>
        ) : (
          data && <CareerStats stats={data.stats} />
        )}

        <div className="profile-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <AccountCard player={user} />
          <AboutCard player={user} />
        </div>

        <FavouriteGamesCard player={user} />

        {data && <AchievementsSection unlockedAchievements={data.achievements} />}
      </div>
    </div>
  );
}