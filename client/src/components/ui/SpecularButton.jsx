/**
 * SpecularButton — animated specular-highlight button
 * Inspired by react-bits.dev/components/specular-button
 *
 * Variants:
 *   "red"    → neon crimson  #e8003d  (primary action)
 *   "silver" → metallic silver #C0C0C0 (secondary action)
 *   "ghost"  → transparent with silver border
 */

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const THEME = {
  red: {
    glow:        'rgba(232,0,61,0.6)',
    glowLight:   'rgba(232,0,61,0.25)',
    border:      '#e8003d',
    bg:          'rgba(232,0,61,0.12)',
    bgHover:     'rgba(232,0,61,0.22)',
    text:        '#FFFFFF',
    specular:    'rgba(255,100,130,0.55)',   // warm pinkish specular streak
    shine:       'rgba(255,160,180,0.3)',
  },
  silver: {
    glow:        'rgba(192,192,192,0.45)',
    glowLight:   'rgba(192,192,192,0.15)',
    border:      '#C0C0C0',
    bg:          'rgba(192,192,192,0.08)',
    bgHover:     'rgba(192,192,192,0.18)',
    text:        '#FFFFFF',
    specular:    'rgba(255,255,255,0.55)',   // cool white specular
    shine:       'rgba(255,255,255,0.25)',
  },
  ghost: {
    glow:        'rgba(192,192,192,0.2)',
    glowLight:   'transparent',
    border:      'rgba(192,192,192,0.4)',
    bg:          'transparent',
    bgHover:     'rgba(192,192,192,0.07)',
    text:        '#C0C0C0',
    specular:    'rgba(255,255,255,0.3)',
    shine:       'rgba(255,255,255,0.15)',
  },
};

export default function SpecularButton({
  children,
  variant = "red",
  onClick,
  size = "md",
  icon = null,
  disabled = false,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [angle, setAngle] = useState(135);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const t = THEME[variant] || THEME.red;
  const thickness = 1.7;
  const radius = 999; // full pill like Apple

  // Track mouse position for specular highlight direction
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setAngle(Math.atan2(dy, dx) * (180 / Math.PI) + 90);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  const padding = size === "sm" ? "8px 18px" : size === "lg" ? "14px 36px" : "11px 26px";
  const fontSize = size === "sm" ? 10 : size === "lg" ? 13 : 11;

  // The specular border: conic-gradient that rotates with mouse
  const borderGradient = hovered
    ? `conic-gradient(from ${angle}deg at 50% 50%, ${t.specular} 0deg, ${t.border} 60deg, transparent 120deg, ${t.border} 240deg, ${t.specular} 300deg, transparent 360deg)`
    : `linear-gradient(${angle}deg, ${t.border} 0%, rgba(${variant === 'red' ? '232,0,61' : '192,192,192'},0.3) 50%, ${t.border} 100%)`;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        padding,
        borderRadius: radius,
        border: 'none',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        fontFamily: '"Space Mono", monospace',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: t.text,
        background: hovered ? t.bgHover : t.bg,
        backdropFilter: 'blur(12px)',
        transition: 'background 0.2s ease',
        // Outer glow on hover
        boxShadow: hovered
          ? `0 0 20px ${t.glow}, 0 0 40px ${t.glowLight}, inset 0 1px 0 ${t.shine}`
          : `0 0 8px ${t.glowLight}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        ...style,
      }}
    >
      {/* ── Specular border ring ── */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          padding: thickness,
          background: borderGradient,
          // Mask so only the border ring is visible
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          transition: 'background 0.25s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Sweeping specular shimmer streak ── */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: hovered ? '130%' : '-40%',
            width: '35%',
            height: '100%',
            background: `linear-gradient(105deg, transparent 0%, ${t.shine} 40%, rgba(255,255,255,0.4) 50%, ${t.shine} 60%, transparent 100%)`,
            transform: 'skewX(-15deg)',
            transition: hovered ? 'left 0.55s cubic-bezier(0.23,1,0.32,1)' : 'left 0s',
            pointerEvents: 'none',
          }}
        />
      </span>

      {/* ── Top-edge specular highlight (static, thin) ── */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: '15%', right: '15%',
          height: 1,
          borderRadius: radius,
          background: `linear-gradient(to right, transparent, ${t.shine}, transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
}
