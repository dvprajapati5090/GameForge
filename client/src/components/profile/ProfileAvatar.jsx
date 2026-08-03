import { motion } from 'framer-motion';

export default function ProfileAvatar({ player }) {
  const profile = player;
  const banner = profile?.riotCard
    ? `https://media.valorant-api.com/playercards/${profile.riotCard}/largeart.png`
    : null;

  return (
    <div style={{ position: 'relative', height: 280, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Banner */}
      {banner ? (
        <img src={banner} alt="Player Card"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px', background: '#080808' }} />
      )}

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          position: 'absolute', left: '50%', bottom: 24,
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        {/* Avatar ring */}
        <div style={{
          width: 112, height: 112, borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.25)',
          padding: 3, background: '#000',
          position: 'relative',
          boxShadow: '0 0 32px rgba(255,255,255,0.08)',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111' }}>
            {profile?.avatar ? (
              <img src={profile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : profile?.riotCard ? (
              <img src={`https://media.valorant-api.com/playercards/${profile.riotCard}/displayicon.png`} alt="Player Card"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, color: '#fff', fontFamily: '"Space Mono", monospace' }}>
                {profile?.displayName?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          {/* Online dot */}
          <div style={{
            position: 'absolute', bottom: 4, right: 4,
            width: 14, height: 14, borderRadius: '50%',
            background: '#22c55e', border: '3px solid #000',
          }} />
        </div>

        {/* Level badge */}
        <div style={{
          marginTop: 8, padding: '3px 12px', borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.8)',
          fontSize: 11, fontWeight: 700, fontFamily: '"Space Mono", monospace',
          color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em',
          backdropFilter: 'blur(8px)',
        }}>
          LV {profile?.accountLevel ?? 1}
        </div>
      </motion.div>
    </div>
  );
}