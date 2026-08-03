/**
 * Sparkline — Tiny inline trend chart (canvas)
 *
 * Props:
 *   data   — array of numbers
 *   color  — line color (default '#e8003d')
 *   height — height px (default 32)
 *   width  — width px (default 80)
 *   filled — fill under curve (default true)
 */
import { useRef, useEffect } from "react";

export default function Sparkline({
    data   = [0, 1, 3, 2, 5, 4, 6],
    color  = "#e8003d",
    height = 32,
    width  = 80,
    filled = true,
    style  = {},
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data || !data.length) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;

        ctx.clearRect(0, 0, W, H);

        const min  = Math.min(...data);
        const max  = Math.max(...data);
        const range = max - min || 1;
        const pad  = 3;

        const toX = (i) => (i / (data.length - 1)) * (W - pad * 2) + pad;
        const toY = (v) => H - pad - ((v - min) / range) * (H - pad * 2);

        /* Build path */
        ctx.beginPath();
        data.forEach((v, i) => {
            const x = toX(i), y = toY(v);
            if (i === 0) ctx.moveTo(x, y);
            else         ctx.lineTo(x, y);
        });

        /* Stroke */
        const hex2rgb = (hex) => {
            if (!hex || hex[0] !== '#') return [200, 0, 61];
            const h = hex.length === 4
                ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
                : hex;
            const r = parseInt(h.slice(1, 3), 16);
            const g = parseInt(h.slice(3, 5), 16);
            const b = parseInt(h.slice(5, 7), 16);
            return [isNaN(r) ? 200 : r, isNaN(g) ? 0 : g, isNaN(b) ? 61 : b];
        };
        const [r,g,b] = hex2rgb(color);

        ctx.strokeStyle = color;
        ctx.lineWidth   = 1.5;
        ctx.lineJoin    = "round";
        ctx.lineCap     = "round";
        ctx.shadowBlur  = 6;
        ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur  = 0;

        /* Fill */
        if (filled) {
            ctx.lineTo(toX(data.length - 1), H);
            ctx.lineTo(toX(0), H);
            ctx.closePath();
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0,   `rgba(${r},${g},${b},0.25)`);
            grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = grad;
            ctx.fill();
        }

        /* End dot */
        const lastX = toX(data.length - 1);
        const lastY = toY(data[data.length - 1]);
        ctx.beginPath();
        ctx.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle  = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

    }, [data, color, filled]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ display: "block", ...style }}
        />
    );
}
