/**
 * PageTransition — Wrap page-level components to get smooth fade+slide entry
 *
 * Usage:
 *   <PageTransition>
 *     <YourPage />
 *   </PageTransition>
 *
 * Props:
 *   variant  — 'fadeUp' | 'fadeIn' | 'slideRight' (default 'fadeUp')
 *   delay    — animation delay seconds (default 0)
 */
import { motion, AnimatePresence } from "framer-motion";

const VARIANTS = {
    fadeUp: {
        initial:  { opacity: 0, y: 22 },
        animate:  { opacity: 1, y: 0 },
        exit:     { opacity: 0, y: -10 },
        transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1] },
    },
    fadeIn: {
        initial:  { opacity: 0 },
        animate:  { opacity: 1 },
        exit:     { opacity: 0 },
        transition: { duration: 0.35 },
    },
    slideRight: {
        initial:  { opacity: 0, x: -24 },
        animate:  { opacity: 1, x: 0 },
        exit:     { opacity: 0, x: 24 },
        transition: { duration: 0.38, ease: [0.215, 0.61, 0.355, 1] },
    },
};

export default function PageTransition({ children, variant = "fadeUp", delay = 0 }) {
    const v = VARIANTS[variant] || VARIANTS.fadeUp;
    return (
        <motion.div
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ ...v.transition, delay }}
        >
            {children}
        </motion.div>
    );
}
