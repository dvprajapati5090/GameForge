import useAuthStore from "../../store/authStore";
import NotificationBell from "../notifications/NotificationBell";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header
      className="

                relative
                z-[1000]
                
                h-20

                flex
                items-center
                justify-between

                px-8

                border-b
                border-violet-500/15

                bg-gradient-to-r
                from-[#0B1020]/90
                via-[#10182D]/85
                to-[#0B1020]/90

                backdrop-blur-xl

                shadow-[0_8px_40px_rgba(139,92,246,0.08)]
            "
    >
      {/* Left */}

      <div className="flex flex-col justify-center">
        <h2
          className="
            text-2xl
            font-bold
            tracking-tight
            text-white
        "
        >
          Welcome back,
          <span
            className="
                ml-2
                bg-gradient-to-r
                from-violet-300
                to-fuchsia-300
                bg-clip-text
                text-transparent
            "
          >
            {user?.displayName}
          </span>
          👋
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-400
        "
        >
          Ready to dominate today's matches.
        </p>
      </div>
      {/* Right */}

      <div className="flex items-center gap-5">
        <div
          className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-white/10

                        bg-gradient-to-br
                        from-white/10
                        to-white/5

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        hover:bg-violet-500/10
                        hover:border-violet-400/30
                        hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                    "
        >
          <NotificationBell />
        </div>

        <div
          className="
                        relative

                        h-12
                        w-12

                        rounded-full

                        bg-gradient-to-br
                        from-violet-500
                        via-fuchsia-500
                        to-indigo-500

                        p-[2px]

                        shadow-[0_0_30px_rgba(139,92,246,0.35)]

                        transition-all
                        duration-300

                        hover:scale-105
                    "
        >
          <div
            className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center

                            rounded-full

                            bg-[#0B1020]

                            text-lg
                            font-bold
                            text-white
                        "
          >
            {user?.displayName?.charAt(0)?.toUpperCase()}
          </div>

          <span
            className="
                            absolute
                            bottom-0
                            right-0

                            h-3
                            w-3

                            rounded-full

                            border-2
                            border-[#0B1020]

                            bg-emerald-400

                            shadow-[0_0_10px_rgba(74,222,128,0.8)]
                        "
          />
        </div>
      </div>
    </header>
  );
}