import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;
    const verify = async () => {
      try {
        await api.get(`/auth/verify-email/${token}`);
        setSuccess(true);
        setMessage('Your email has been verified successfully.');
        setTimeout(() => navigate('/login'), 2500);
      } catch (error) {
        setSuccess(false);
        setMessage(error.response?.status === 400
          ? 'This verification link is invalid or has expired.'
          : 'Something went wrong. Please try again later.');
      } finally { setLoading(false); }
    };
    verify();
  }, [token, navigate]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Space Mono", monospace', position: 'relative' }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px' }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: 420, margin: '0 32px',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
          background: 'rgba(255,255,255,0.02)', padding: 40,
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}
      >
        {/* Corner accents */}
        <div style={{ position: 'absolute', left: 16, top: 16, width: 20, height: 20, borderLeft: '1px solid rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', right: 16, bottom: 16, width: 20, height: 20, borderRight: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }} />

        {loading ? (
          <>
            <div style={{ width: 48, height: 48, border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Verifying Email...</h2>
            <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Please wait while we authenticate your token.</p>
          </>
        ) : success ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>VERIFICATION COMPLETE</p>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>Email Verified</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{message}</p>
            <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>REDIRECTING TO LOGIN...</p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✕</div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,80,80,0.7)', textTransform: 'uppercase', marginBottom: 12 }}>VERIFICATION FAILED</p>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>Token Invalid</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>{message}</p>
            <motion.button
              onClick={() => navigate('/login')}
              style={{ padding: '10px 24px', background: '#fff', color: '#000', border: 'none', borderRadius: 8, fontSize: 12, fontFamily: '"Space Mono", monospace', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.08em' }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              BACK TO LOGIN
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}