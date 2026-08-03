/**
 * TypewriterText — Animated typewriter with blinking cursor
 *
 * Fixed: uses useRef to store the texts array so inline array literals
 * from parent renders don't cause new references → restarting animations.
 *
 * Props:
 *   texts     — array of strings to cycle through
 *   speed     — ms per character (default 60)
 *   pauseMs   — ms to hold completed text (default 1800)
 *   deleteMs  — ms per delete character (default 30)
 *   style     — extra style
 *   cursorColor — cursor color (default '#e8003d')
 */
import { useState, useEffect, useRef } from "react";

export default function TypewriterText({
    texts       = ["Welcome back."],
    speed       = 60,
    pauseMs     = 1800,
    deleteMs    = 30,
    style       = {},
    cursorColor = "#e8003d",
}) {
    const [display, setDisplay] = useState("");
    const [textIdx, setTextIdx] = useState(0);
    const [phase, setPhase]     = useState("typing"); /* typing | deleting */
    const [charIdx, setCharIdx] = useState(0);
    const [blink, setBlink]     = useState(true);

    /* Stabilise texts array — prevents inline literal from resetting animation */
    const textsRef = useRef(texts);
    useEffect(() => { textsRef.current = texts; }, [texts]);

    /* Cursor blink — independent loop, never restarts */
    useEffect(() => {
        const id = setInterval(() => setBlink(b => !b), 530);
        return () => clearInterval(id);
    }, []);

    /* Typing / deleting engine — depends only on scalar values, not the array ref */
    useEffect(() => {
        const safeTexts = textsRef.current;
        if (!safeTexts.length) return;

        const current = safeTexts[textIdx % safeTexts.length] || "";

        if (phase === "typing") {
            if (charIdx < current.length) {
                const id = setTimeout(() => {
                    setDisplay(current.slice(0, charIdx + 1));
                    setCharIdx(i => i + 1);
                }, speed);
                return () => clearTimeout(id);
            } else {
                /* Hold then switch to deleting */
                const id = setTimeout(() => setPhase("deleting"), pauseMs);
                return () => clearTimeout(id);
            }
        }

        if (phase === "deleting") {
            if (charIdx > 0) {
                const id = setTimeout(() => {
                    setDisplay(current.slice(0, charIdx - 1));
                    setCharIdx(i => i - 1);
                }, deleteMs);
                return () => clearTimeout(id);
            } else {
                /* Move to next phrase synchronously (no setState race) */
                setTextIdx(i => (i + 1) % safeTexts.length);
                setPhase("typing");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, charIdx, textIdx, speed, pauseMs, deleteMs]);
    /* NOTE: 'texts' is intentionally omitted — we use textsRef to avoid
       inline-array reference churn causing the effect to restart. */

    return (
        <span style={{ ...style }}>
            {display}
            <span
                style={{
                    display: "inline-block",
                    width: 2,
                    height: "0.85em",
                    background: blink ? cursorColor : "transparent",
                    marginLeft: 3,
                    verticalAlign: "middle",
                    borderRadius: 1,
                    transition: "background 0.1s",
                    boxShadow: blink ? `0 0 8px ${cursorColor}` : "none",
                }}
            />
        </span>
    );
}
