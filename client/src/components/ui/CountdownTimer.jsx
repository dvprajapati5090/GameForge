/**
 * CountdownTimer — Live countdown to a tournament date
 *
 * Props:
 *   targetDate  — ISO date string or Date object
 *   label       — label below the timer (default "Until Tournament Starts")
 *   accent      — color (default '#e8003d')
 *   compact     — if true, renders as a single line (default false)
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function pad(n) { return String(n).padStart(2, "0"); }

function getTimeLeft(target) {
    const diff = new Date(target) - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
    return {
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
        over:    false,
    };
}

function FlipDigit({ value, accent }) {
    return (
        <motion.div
            key={value}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
                display: "inline-block",
                fontSize: 28, fontWeight: 700, color: "#fff",
                fontFamily: '"Space Mono", monospace',
                letterSpacing: "-0.04em", lineHeight: 1,
                textShadow: `0 0 12px ${accent}80`,
            }}
        >
            {pad(value)}
        </motion.div>
    );
}

export default function CountdownTimer({
    targetDate,
    label   = "Until Tournament Starts",
    accent  = "#e8003d",
    compact = false,
}) {
    const [time, setTime] = useState(() => getTimeLeft(targetDate));

    useEffect(() => {
        if (time.over) return;
        const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
        return () => clearInterval(id);
    }, [targetDate]);

    if (time.over) {
        return (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, background: `${accent}15`, border: `1px solid ${accent}45`, fontFamily: '"Space Mono", monospace' }}>
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: accent }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.14em" }}>LIVE NOW</span>
            </div>
        );
    }

    if (compact) {
        return (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: '"Space Mono", monospace' }}>
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "rgba(192,192,192,0.7)", letterSpacing: "0.04em" }}>
                    {time.days > 0 && `${time.days}d `}
                    {pad(time.hours)}h {pad(time.minutes)}m {pad(time.seconds)}s
                </span>
            </div>
        );
    }

    const UNITS = [
        { label: "DAYS",    value: time.days    },
        { label: "HOURS",   value: time.hours   },
        { label: "MINS",    value: time.minutes },
        { label: "SECS",    value: time.seconds },
    ];

    return (
        <div style={{ fontFamily: '"Space Mono", monospace' }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 8 }}>
                {UNITS.map((u, i) => (
                    <div key={u.label} style={{ textAlign: "center" }}>
                        <div style={{
                            padding: "10px 14px", borderRadius: 12, minWidth: 60,
                            border: `1px solid ${accent}30`,
                            background: `${accent}0d`,
                            position: "relative", overflow: "hidden",
                        }}>
                            {/* Shine sweep */}
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                                style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", width: "50%" }}
                            />
                            <FlipDigit value={u.value} accent={accent} />
                        </div>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 5, letterSpacing: "0.16em", fontWeight: 700 }}>
                            {u.label}
                        </div>
                    </div>
                ))}
            </div>
            {label && (
                <p style={{ fontSize: 10, color: "rgba(192,192,192,0.4)", letterSpacing: "0.08em", marginTop: 4 }}>
                    ▸ {label}
                </p>
            )}
        </div>
    );
}
