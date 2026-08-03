import { motion } from 'framer-motion';

export default function SquashHamburger({ isOpen, onClick, size = 'desktop' }) {
  const isDesktop = size === 'desktop';
  const containerW = isDesktop ? 18 : 15;
  const containerH = isDesktop ? 12 : 10;
  const barH = isDesktop ? 1.5 : 1.2;

  const spring = { type: 'spring', stiffness: 300, damping: 20 };

  return (
    <button
      onClick={onClick}
      style={{ width: containerW, height: containerH, position: 'relative', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Top bar */}
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: barH,
          background: '#fff',
          borderRadius: 2,
          top: 0,
          originX: 0.5,
          originY: 0.5,
        }}
        animate={isOpen
          ? { rotate: 45, y: containerH / 2 - barH / 2 }
          : { rotate: 0, y: 0 }
        }
        transition={spring}
      />
      {/* Middle bar */}
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: barH,
          background: '#fff',
          borderRadius: 2,
          top: '50%',
          marginTop: -barH / 2,
        }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      {/* Bottom bar */}
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: barH,
          background: '#fff',
          borderRadius: 2,
          bottom: 0,
          originX: 0.5,
          originY: 0.5,
        }}
        animate={isOpen
          ? { rotate: -45, y: -(containerH / 2 - barH / 2) }
          : { rotate: 0, y: 0 }
        }
        transition={spring}
      />
    </button>
  );
}
