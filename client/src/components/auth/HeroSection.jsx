import { motion } from "framer-motion";

const stats = [
  {
    title: "50+",
    subtitle: "Live Tournaments",
  },
  {
    title: "12K+",
    subtitle: "Competitive Players",
  },
  {
    title: "300+",
    subtitle: "Registered Teams",
  },
  {
    title: "24/7",
    subtitle: "Platform Support",
  },
];

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="
        hidden
        lg:flex

        w-[55%]

        flex-col

        justify-start

        pt-16

        pr-16
      "
    >
      {/* Tag */}

      <p
        className="
          uppercase

          tracking-[0.45rem]

          text-violet-400

          text-sm

          font-semibold
        "
      >
        NEXT GENERATION ESPORTS PLATFORM
      </p>

      {/* Logo */}

      <h1
        className="
          mt-5

          text-6xl

          font-black

          tracking-tight
        "
      >
        <span className="text-white">GAME</span>

        <span className="text-violet-400">FORGE</span>
      </h1>

      {/* Main Heading */}

      <h2
        className="
          mt-7

          text-5xl

          font-extrabold

          leading-tight

          text-white
        "
      >
        ORGANIZE.
        <br />
        COMPETE.
        <br />
        DOMINATE.
      </h2>

      {/* Features */}

      <div
        className="
    mt-12

    max-w-xl

    space-y-6
  "
      >
        <div className="flex items-start gap-4">
          <div className="mt-2 h-2.5 w-2.5 rounded-full bg-violet-400" />

          <div>
            <h3 className="font-semibold text-white">
              Create & Manage Tournaments (Admin Panel)
            </h3>

            <p className="mt-1 text-slate-400 leading-7">
              Organize custom tournaments with automated registrations,
              scheduling and match management.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-2 h-2.5 w-2.5 rounded-full bg-violet-400" />

          <div>
            <h3 className="font-semibold text-white">Build Your Team</h3>

            <p className="mt-1 text-slate-400 leading-7">
              Create your roster, invite teammates and compete together across
              multiple esports teams.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-2 h-2.5 w-2.5 rounded-full bg-violet-400" />

          <div>
            <h3 className="font-semibold text-white">
              Track Competitive Progress
            </h3>

            <p className="mt-1 text-slate-400 leading-7">
              Monitor match history, rankings, player statistics and performance
              through one unified dashboard.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
