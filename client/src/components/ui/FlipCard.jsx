/**
 * FlipCard — 3D CSS flip card
 * Front face shows normal content; back face shows detail content on hover.
 *
 * Props:
 *   front        — React node for front face
 *   back         — React node for back face
 *   height       — card height (default 220)
 *   flipOnClick  — if true, toggles on click instead of hover (default false)
 *   rounded      — border-radius (default 20)
 */
import { useState } from "react";

export default function FlipCard({
    front,
    back,
    height     = 220,
    flipOnClick = false,
    rounded    = 20,
    style      = {},
}) {
    const [flipped, setFlipped] = useState(false);

    const handlers = flipOnClick
        ? { onClick: () => setFlipped(f => !f) }
        : { onMouseEnter: () => setFlipped(true), onMouseLeave: () => setFlipped(false) };

    return (
        <div
            {...handlers}
            style={{
                perspective: 1200,
                height,
                cursor: flipOnClick ? "pointer" : "default",
                ...style,
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        borderRadius: rounded,
                        overflow: "hidden",
                    }}
                >
                    {front}
                </div>

                {/* Back */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderRadius: rounded,
                        overflow: "hidden",
                    }}
                >
                    {back}
                </div>
            </div>
        </div>
    );
}
