import useAuthStore from "../../store/authStore";
import NotificationBell from "../notifications/NotificationBell";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const [avatarHover, setAvatarHover] = useState(false);
  const isHost = user?.role === "HOST";

  return (
    <header style={{
      position: 'relative', zIndex: 1000,
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      background: 'rgba(7,0,10,0.82)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      fontFamily: '"Space Mono", monospace',
      boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
    }}>
      {/* Animated red left accent */}
      <motion.div
        animate={{ boxShadow: ['0 0 10px rgba(232,0,61,0.6)', '0 0 20px rgba(232,0,61,1)', '0 0 10px rgba(232,0,61,0.6)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          position: 'absolute', left: 0, top: 0, width: 3, height: '100%',
          background: '#e8003d',
          borderRadius: '0 2px 2px 0',
        }}
      />
      {/* Bottom gradient sweep */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, rgba(232,0,61,0.4) 0%, rgba(192,192,192,0.1) 30%, transparent 70%)',
      }} />

      {/* Left: Greeting */}
      <div style={{ paddingLeft: 16 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
          Welcome back,{' '}
          <span style={{ color: '#C0C0C0', fontWeight: 400 }}>{user?.displayName}</span>
        </h2>
        <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#e8003d', flexShrink: 0 }}
          />
          <span style={{ fontSize: 9, color: '#e8003d', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
            {isHost ? 'Host Mode Active' : 'Ready to Dominate'}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Notification bell */}
        <NotificationBell />

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.08)' }} />

        {/* Role chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 999,
          background: isHost ? 'rgba(232,0,61,0.12)' : 'rgba(124,58,237,0.12)',
          border: `1px solid ${isHost ? 'rgba(232,0,61,0.35)' : 'rgba(124,58,237,0.35)'}`,
        }}>
          <Zap size={9} color={isHost ? '#e8003d' : '#9b6dff'} fill={isHost ? '#e8003d' : '#9b6dff'} />
          <span style={{ fontSize: 8, fontWeight: 700, color: isHost ? '#e8003d' : '#9b6dff', letterSpacing: '0.12em' }}>
            {isHost ? 'HOST' : 'PLAYER'}
          </span>
        </div>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          style={{
            position: 'relative', width: 36, height: 36, borderRadius: 12,
            border: `1.5px solid ${avatarHover ? 'rgba(232,0,61,0.9)' : 'rgba(232,0,61,0.45)'}`,
            background: avatarHover ? 'rgba(232,0,61,0.28)' : 'rgba(232,0,61,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#fff',
            transition: 'all 0.2s ease',
            boxShadow: avatarHover ? '0 0 16px rgba(232,0,61,0.45)' : '0 0 8px rgba(232,0,61,0.15)',
          }}
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          {user?.displayName?.charAt(0)?.toUpperCase()}
          {/* Online dot */}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 9, height: 9, borderRadius: '50%',
              background: '#22c55e', border: '2px solid #07000a',
              boxShadow: '0 0 6px rgba(34,197,94,0.8)',
            }}
          />
        </motion.div>

        {/* Name + role */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
            {user?.displayName}
          </div>
          <div style={{ fontSize: 9, color: isHost ? '#e8003d' : '#9b6dff', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2, fontWeight: 700 }}>
            {isHost ? 'Host' : 'Player'}
          </div>
        </div>
      </div>
    </header>
  );
}