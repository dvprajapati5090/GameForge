import { motion } from "framer-motion";

export default function GlassCard({
  children,

  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.005,
      }}
      transition={{
        duration: 0.22,
      }}
      className={`
                group

                relative

                rounded-2xl

                border
                border-white/20

                bg-black/50

                backdrop-blur-2xl

                shadow-[0_20px_55px_rgba(0,0,0,.35)]

                overflow-hidden

                transition-all
                duration-300

                hover:border-white/30
                hover:shadow-[0_30px_80px_rgba(255,255,255,.05)]

                ${className}
            `}
    >
      {/* Ambient Glow */}

      <div
        className="
                    absolute
                    inset-0

                    opacity-0
                    group-hover:opacity-100

                    transition-opacity
                    duration-500

                    bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.05),transparent_60%)]
                "
      />

      {/* Soft Border Glow */}

      <div
        className="
                    absolute

                    inset-0

                    rounded-2xl

                    border

                    border-white/20

                    group-hover:border-white/30

                    transition-all
                    duration-500
                "
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
