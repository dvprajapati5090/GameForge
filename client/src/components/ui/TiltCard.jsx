/**
 * TiltCard — Subtle 3D mouse-tracking tilt effect wrapper
 *
 * Wraps any children in a div that tilts toward the cursor on hover.
 * Uses requestAnimationFrame for smooth, performant tracking.
 * Fixed: stops RAF loop when values converge (prevents infinite 60fps loop).
 *
 * Props:
 *   maxTilt   — max tilt degrees (default 8)
 *   scale     — scale on hover (default 1.02)
 *   glare     — show glare overlay (default true)
 *   style     — extra style for wrapper
 */
import { useRef, useState, useCallback, useEffect } from "react";

export default function TiltCard({
    children,
    maxTilt = 8,
    scale   = 1.02,
    glare   = true,
    style   = {},
}) {
    const ref        = useRef(null);
    const rafRef     = useRef(null);
    const stateRef   = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
    const targetRef  = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
    const [active, setActive]     = useState(false);
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [tilt, setTilt]         = useState({ rx: 0, ry: 0 });

    /* Update target values on mouse move — does NOT start its own RAF */
    const onMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);

        targetRef.current.rx = -dy * maxTilt;
        targetRef.current.ry =  dx * maxTilt;
        targetRef.current.gx = ((e.clientX - rect.left) / rect.width)  * 100;
        targetRef.current.gy = ((e.clientY - rect.top)  / rect.height) * 100;
    }, [maxTilt]);

    /* Single RAF loop that runs only while active; stops when converged */
    useEffect(() => {
        if (!active) return;

        const loop = () => {
            const s = stateRef.current;
            const t = targetRef.current;
            const LERP = 0.14;

            s.rx += (t.rx - s.rx) * LERP;
            s.ry += (t.ry - s.ry) * LERP;
            s.gx += (t.gx - s.gx) * LERP;
            s.gy += (t.gy - s.gy) * LERP;

            setTilt({ rx: s.rx, ry: s.ry });
            setGlarePos({ x: s.gx, y: s.gy });

            /* Continue only if not yet converged */
            const notDone =
                Math.abs(t.rx - s.rx) > 0.01 ||
                Math.abs(t.ry - s.ry) > 0.01;

            rafRef.current = notDone ? requestAnimationFrame(loop) : null;
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, tilt, glarePos]); // re-trigger when mouse moves (state updates) or active changes

    const onMouseEnter = useCallback(() => setActive(true), []);

    const onMouseLeave = useCallback(() => {
        setActive(false);
        cancelAnimationFrame(rafRef.current);

        /* Spring-reset to zero */
        const reset = () => {
            const s = stateRef.current;
            s.rx *= 0.84;
            s.ry *= 0.84;
            setTilt({ rx: s.rx, ry: s.ry });

            if (Math.abs(s.rx) > 0.01 || Math.abs(s.ry) > 0.01) {
                rafRef.current = requestAnimationFrame(reset);
            } else {
                s.rx = 0; s.ry = 0;
                targetRef.current.rx = 0;
                targetRef.current.ry = 0;
                setTilt({ rx: 0, ry: 0 });
            }
        };
        rafRef.current = requestAnimationFrame(reset);
    }, []);

    /* Cleanup on unmount */
    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${active ? scale : 1})`,
                transition: active ? "transform 0.08s linear" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                transformStyle: "preserve-3d",
                willChange: "transform",
                position: "relative",
                ...style,
            }}
        >
            {children}

            {/* Glare overlay */}
            {glare && active && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        pointerEvents: "none",
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.09) 0%, transparent 65%)`,
                        mixBlendMode: "screen",
                        zIndex: 10,
                    }}
                />
            )}
        </div>
    );
}
