import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Crosshair, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginSchema } from '../validators/auth.validator';
import useLogin from '../hooks/useLogin';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);
  const scramble = () => {
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      const cursor = Math.floor(frame / 2);
      setDisplay(text.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (i < cursor) return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      if (cursor >= text.length) { clearInterval(iv); setDisplay(text); }
    }, 25);
  };
  return <span onMouseEnter={scramble}>{display}</span>;
}

const VALORANT_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
  const loginMutation = useLogin();
  const [showPw, setShowPw] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) toast.success(location.state.success);
  }, [location]);

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', fontFamily: '"Space Mono", monospace', overflow: 'hidden', position: 'relative' }}>

      {/* Back to Landing button — always top-left */}
      <Link
        to="/"
        style={{
          position: 'absolute', top: 20, left: 20, zIndex: 50,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 10,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 11, fontFamily: '"Space Mono", monospace',
          textDecoration: 'none', letterSpacing: '0.06em',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
      >
        <ArrowLeft size={12} /> Back to Home
      </Link>
      {/* Left: Cinematic video panel */}
      <div className="hidden lg:block" style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline src={VALORANT_VIDEO}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0) 60%, #000 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', bottom: 48, left: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>
            GAMEFORGE // VALORANT PLATFORM
          </p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            The Arena<br />Awaits.
          </h2>
          <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 320 }}>
            Sync your Riot ID. Track your stats. Compete in curated Valorant tournaments.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', position: 'relative', overflowY: 'auto' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <Crosshair size={22} color="#fff" />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>GameForge</span>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>
            <GlitchText text="Sign In" />
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 40, letterSpacing: '0.05em' }}>
            ENTER YOUR CREDENTIALS TO ACCESS THE ARENA
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Email</label>
              <input {...register('email')} type="email" placeholder="agent@gameforge.gg"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: errors.email ? '1px solid rgba(255,80,80,0.6)' : '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: '"Space Mono", monospace', outline: 'none', boxSizing: 'border-box' }}
              />
              {errors.email && <p style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,80,80,0.9)' }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Password</label>
                {/* Forgot Password link */}
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 11, color: 'rgba(232,0,61,0.8)',
                    fontFamily: '"Space Mono", monospace',
                    letterSpacing: '0.06em',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    transition: 'color 0.15s',
                    padding: 0,
                  }}
                  onMouseEnter={e => e.target.style.color = '#e8003d'}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,0,61,0.8)'}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input {...register('password')} type={showPw ? 'text' : 'password'} placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 44px 12px 16px', background: 'rgba(255,255,255,0.04)', border: errors.password ? '1px solid rgba(255,80,80,0.6)' : '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: '"Space Mono", monospace', outline: 'none', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0 }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,80,80,0.9)' }}>{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <motion.button type="submit" disabled={loginMutation.isPending}
              style={{ width: '100%', padding: '13px 0', marginTop: 8, background: loginMutation.isPending ? 'rgba(255,255,255,0.6)' : '#fff', color: '#000', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: '"Space Mono", monospace', cursor: loginMutation.isPending ? 'not-allowed' : 'pointer', letterSpacing: '0.08em' }}
              whileHover={!loginMutation.isPending ? { scale: 1.02 } : {}}
              whileTap={!loginMutation.isPending ? { scale: 0.98 } : {}}
            >
              {loginMutation.isPending ? 'AUTHENTICATING...' : 'ENTER ARENA'}
            </motion.button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* Google */}
            <GoogleLoginButton />
          </form>

          <p style={{ marginTop: 32, fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
            No account yet?{' '}
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              Register here
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </div>
  );
}