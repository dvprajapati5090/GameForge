import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ScrambleIn, ScrambleText } from '../components/ui/ScrambleText';
import SquashHamburger from '../components/ui/SquashHamburger';
import ForgeLogo from '../components/ui/ForgeLogo';

// ─── Video URLs ────────────────────────────────────────────────────────────────
const VIDEOS = {
  hero:   'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4',
  second: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4',
  metrics:'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4',
  tech:   'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4',
  footer: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4',
};

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ entranceComplete, navigate }) {
  const [open, setOpen] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [aboutHover, setAboutHover] = useState(false);
  const [metricsHover, setMetricsHover] = useState(false);
  const spring = { type: 'spring', stiffness: 350, damping: 28 };

  const scrollTo = (px) => { window.scrollTo({ top: px, behavior: 'smooth' }); setOpen(false); };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6"
      style={{ height: 80, fontFamily: '"Space Mono", monospace' }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* LEFT GROUP */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Logo Pill */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer select-none px-5 rounded-[14px]"
          style={{ height: 48, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
          whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.22)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ForgeLogo size={18} color="#fff" />
          <span className="text-white text-base font-medium tracking-tight">GameForge</span>
        </motion.div>

        {/* Expanding Menu Pill */}
        <motion.div
          className="flex items-center overflow-hidden rounded-[14px]"
          style={{ height: 48, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
          animate={{ width: open ? 290 : 48 }}
          transition={spring}
        >
          <motion.div
            className="flex-shrink-0 flex items-center justify-center text-white cursor-pointer"
            style={{
              width: open ? 36 : 48,
              height: open ? 36 : 48,
              borderRadius: open ? 11 : 14,
              background: open ? 'rgba(255,255,255,0.10)' : 'transparent',
              marginLeft: open ? 6 : 0,
              flexShrink: 0,
            }}
            onClick={() => setOpen(!open)}
            whileHover={{ background: 'rgba(255,255,255,0.20)' }}
            transition={{ duration: 0.2 }}
          >
            <SquashHamburger isOpen={open} onClick={() => {}} size="desktop" />
          </motion.div>

          <AnimatePresence>
            {open && (
              <motion.div
                className="flex items-center gap-6 pl-4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className="text-white/85 hover:text-white text-base font-normal cursor-pointer whitespace-nowrap bg-transparent border-none"
                  onMouseEnter={() => setAboutHover(true)}
                  onMouseLeave={() => setAboutHover(false)}
                  onClick={() => scrollTo(window.innerHeight)}
                >
                  <ScrambleText text="About" isHovered={aboutHover} />
                </button>
                <button
                  className="text-white/85 hover:text-white text-base font-normal cursor-pointer whitespace-nowrap bg-transparent border-none"
                  onMouseEnter={() => setMetricsHover(true)}
                  onMouseLeave={() => setMetricsHover(false)}
                  onClick={() => scrollTo(window.innerHeight * 2)}
                >
                  <ScrambleText text="Metrics" isHovered={metricsHover} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Logo */}
      <div className="flex sm:hidden items-center gap-2">
        <ForgeLogo size={16} color="#fff" />
        <span className="text-white text-sm font-medium tracking-tight">GameForge</span>
      </div>

      {/* RIGHT: Enter App Button */}
      <motion.button
        className="flex items-center gap-2 cursor-pointer rounded-full font-medium text-black bg-white"
        style={{ height: 48, paddingLeft: 24, paddingRight: 24, fontSize: 14 }}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        whileHover={{ scale: 1.03, background: '#e2e2e6' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/dashboard')}
      >
        <i className="bi bi-controller" />
        <ScrambleText text="Enter Arena" isHovered={btnHover} />
      </motion.button>
    </motion.nav>
  );
}

// ─── SECTION 1: Hero ───────────────────────────────────────────────────────────
function HeroSection({ entranceComplete }) {
  const videoRef = useRef(null);
  const lastMouseX = useRef(null);
  const isSeeking = useRef(false);
  const pendingSeek = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;

    const onSeeked = () => {
      if (pendingSeek.current !== null) {
        const next = pendingSeek.current;
        pendingSeek.current = null;
        video.currentTime = next;
      } else {
        isSeeking.current = false;
      }
    };
    video.addEventListener('seeked', onSeeked);
    return () => video.removeEventListener('seeked', onSeeked);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      if (lastMouseX.current === null) { lastMouseX.current = e.clientX; return; }
      const delta = e.clientX - lastMouseX.current;
      lastMouseX.current = e.clientX;
      const newTime = Math.max(0, Math.min(video.duration, video.currentTime + delta * 0.8 * (video.duration / window.innerWidth)));
      if (isSeeking.current) {
        pendingSeek.current = newTime;
      } else {
        isSeeking.current = true;
        video.currentTime = newTime;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '100vh', minHeight: '100dvh' }}>
      {/* Video BG */}
      <video
        ref={videoRef}
        src={VIDEOS.hero}
        preload="auto"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      {/* Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1, top: 50 }}
      >
        <span
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            textTransform: 'uppercase',
            letterSpacing: '-4px',
            opacity: 0.10,
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          VALORANT
        </span>
      </div>

      {/* Content */}
      <motion.div
        className="relative flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
        style={{ zIndex: 10 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <h1
              className="text-white font-light leading-[0.95]"
              style={{ letterSpacing: '-0.03em', fontSize: 'clamp(40px,10vw,100px)', fontFamily: '"Space Mono", monospace' }}
            >
              <ScrambleIn text="Sync" delay={200} triggered={entranceComplete} /><br />
              <ScrambleIn text="Your Stats" delay={500} triggered={entranceComplete} />
            </h1>
            <motion.p
              className="text-white/60 leading-relaxed max-w-sm"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', fontFamily: '"Space Mono", monospace' }}
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
            >
              Built for Valorant competitors. GameForge syncs your Riot ID, tracks real-time performance, and puts you in the arena with rivals who match your level.
            </motion.p>
          </div>
          {/* Right */}
          <h1
            className="text-white font-light leading-[0.95] text-left md:text-right"
            style={{ letterSpacing: '-0.03em', fontSize: 'clamp(40px,10vw,100px)', fontFamily: '"Space Mono", monospace' }}
          >
            <ScrambleIn text="Forge" delay={700} triggered={entranceComplete} /><br />
            <ScrambleIn text="Legacy" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}

// ─── SECTION 2: Cinematic Text ─────────────────────────────────────────────────
function CinematicTextSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const rawOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const ySpring = useSpring(rawY, { stiffness: 15, damping: 32, mass: 1.8 });
  const opSpring = useSpring(rawOpacity, { stiffness: 15, damping: 32 });
  const transform = useMotionTemplate`perspective(400px) rotateX(24deg) translateY(${ySpring}px) translateZ(15px)`;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100vh', minHeight: '100dvh' }}
    >
      <video autoPlay muted loop playsInline src={VIDEOS.second}
        className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to bottom, #010103 0%, transparent 180px)' }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
        <motion.p
          className="text-white text-center select-none px-6 sm:px-12 leading-[1.35] font-normal max-w-5xl"
          style={{ fontSize: 'clamp(22px,3.5vw,42px)', letterSpacing: '-0.02em', fontFamily: '"Space Mono", monospace', transformStyle: 'preserve-3d', transform, opacity: opSpring }}
        >
          A competitive intelligence platform built on real Riot Games data. GameForge translates your match history into structured insights. Every kill, every death, every round becomes measurable and visible. It continuously maps your playstyle as a dynamic performance profile. Noise is filtered into actionable ranked intelligence.
        </motion.p>
      </div>
    </section>
  );
}

// ─── SECTION 3: Metrics ────────────────────────────────────────────────────────
const METRICS = [
  { value: '0.5ms', label: 'Sync Latency' },
  { value: '99.7%', label: 'API Accuracy' },
  { value: '1000+', label: 'Players Tracked' },
  { value: '24/7', label: 'Live Monitoring' },
];

function MetricsSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', background: '#000' }}>
      <video autoPlay muted loop playsInline src={VIDEOS.metrics}
        className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0, opacity: 0.5 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'rgba(0,0,0,0.5)' }} />
      <div className="relative flex flex-col items-center justify-center w-full max-w-6xl mx-auto pt-32 pb-32 px-6" style={{ zIndex: 2 }}>
        <motion.p
          className="text-white/40 uppercase tracking-[0.2em] mb-20 text-center"
          style={{ fontSize: 'clamp(13px,1vw,14px)', fontFamily: '"Space Mono", monospace' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }} viewport={{ once: true, amount: 0.3 }}
        >
          Performance Metrics
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 w-full">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="text-white font-light leading-none" style={{ fontSize: 'clamp(48px,10vw,96px)', letterSpacing: '-0.04em', fontFamily: '"Space Mono", monospace' }}>
                {m.value}
              </span>
              <span className="text-white/40 mt-4 tracking-wide" style={{ fontSize: 'clamp(13px,1vw,15px)', fontFamily: '"Space Mono", monospace' }}>
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4: Technology ─────────────────────────────────────────────────────
const TECH_ITEMS = [
  { title: 'Riot ID Sync',         desc: 'Real-time synchronization of your Valorant account and match history.' },
  { title: 'Rank Isolation',       desc: 'Separates skill metrics from variance to reveal true performance.' },
  { title: 'Match Prediction',     desc: 'Anticipates opponent playstyles before the round starts.' },
  { title: 'Tournament Feedback',  desc: 'Closed-loop improvement based on bracket and match outcomes.' },
];

function TechSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '100dvh' }}>
      <video autoPlay muted loop playsInline src={VIDEOS.tech}
        className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'rgba(0,0,0,0.55)' }} />
      <div className="relative flex flex-col h-full px-8 sm:px-12 md:px-16 py-12 sm:py-16" style={{ zIndex: 2, fontFamily: '"Space Mono", monospace' }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <motion.h2
            className="text-white font-light leading-[0.95]"
            style={{ fontSize: 'clamp(36px,8vw,72px)', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }} viewport={{ once: true, amount: 0.3 }}
          >
            Adaptive<br />Intelligence
          </motion.h2>
          <motion.p
            className="text-white/50 leading-relaxed max-w-xs md:text-right md:pt-2"
            style={{ fontSize: 'clamp(13px,1.2vw,15px)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
          >
            The system learns your play pattern within 72 hours. From there, every agent pick, map choice, and economy decision is mapped, predicted, and optimized in real time.
          </motion.p>
        </div>
        <div className="flex-1" />
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3 }} viewport={{ once: true, amount: 0.2 }}
        >
          {TECH_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-white font-normal mb-2" style={{ fontSize: 'clamp(14px,1.2vw,16px)' }}>{item.title}</p>
              <p className="text-white/40 leading-relaxed" style={{ fontSize: 'clamp(12px,1vw,14px)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 5: Architecture ───────────────────────────────────────────────────
const LAYERS = [
  { num: 'Layer 1', label: 'Capture' },
  { num: 'Layer 2', label: 'Process' },
  { num: 'Layer 3', label: 'Interface' },
];

function ArchSection() {
  return (
    <section className="relative bg-black w-full" style={{ minHeight: '100vh', fontFamily: '"Space Mono", monospace' }}>
      <div className="flex flex-col items-center max-w-3xl mx-auto px-6 py-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }} viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-white/40 uppercase tracking-[0.2em] mb-8" style={{ fontSize: 'clamp(13px,1vw,14px)' }}>Architecture</p>
          <h2 className="text-white font-light leading-[1.15] mb-10" style={{ fontSize: 'clamp(28px,6vw,56px)', letterSpacing: '-0.02em' }}>
            Three layers.<br />Zero friction.
          </h2>
          <p className="text-white/45 leading-relaxed max-w-xl mx-auto" style={{ fontSize: 'clamp(15px,1.4vw,17px)' }}>
            Riot API layer captures raw match data. Processing layer isolates performance patterns. Dashboard layer delivers structured output to players and teams.
          </p>
        </motion.div>
        <motion.div
          className="mt-20 flex flex-col items-center gap-4 w-full"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }} viewport={{ once: true, amount: 0.4 }}
        >
          {LAYERS.map((l) => (
            <div
              key={l.num}
              className="w-full max-w-md flex items-center justify-between px-6 rounded-lg"
              style={{ height: 72, border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <span className="text-white/30 uppercase tracking-[0.15em]" style={{ fontSize: 12 }}>{l.num}</span>
              <span className="text-white font-light" style={{ fontSize: 'clamp(16px,1.5vw,18px)' }}>{l.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer className="relative bg-black overflow-hidden w-full" style={{ fontFamily: '"Space Mono", monospace' }}>
      <div className="flex flex-col md:flex-row" style={{ minHeight: 400 }}>
        {/* Left video */}
        <div className="relative overflow-hidden" style={{ flex: '0 0 50%', height: 300, minHeight: 300 }}>
          <video autoPlay muted loop playsInline src={VIDEOS.footer}
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
        </div>
        {/* Right content */}
        <div className="flex flex-col justify-between p-10 sm:p-16 flex-1">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <ForgeLogo size={18} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>GameForge</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 'clamp(14px,1.2vw,15px)', lineHeight: 1.7, maxWidth: 340 }}>
              The competitive edge for Valorant players. Track your stats, build your team, dominate the leaderboard.
            </p>
            <motion.button
              className="mt-8 flex items-center gap-2 bg-white text-black rounded-full font-medium cursor-pointer"
              style={{ height: 44, paddingLeft: 20, paddingRight: 20, fontSize: 14 }}
              whileHover={{ background: '#e2e2e6', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
            >
              <i className="bi bi-controller" />
              Enter the Arena
            </motion.button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 48 }}>
            © 2026 GameForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT LANDING PAGE ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: '"Space Mono", monospace', background: '#000', color: '#fff', overflowX: 'hidden' }}>
      <Navbar entranceComplete={entranceComplete} navigate={navigate} />
      <HeroSection entranceComplete={entranceComplete} />
      <CinematicTextSection />
      <MetricsSection />
      <TechSection />
      <ArchSection />
      <Footer navigate={navigate} />
    </div>
  );
}
