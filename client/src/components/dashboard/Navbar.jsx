import useAuthStore from "../../store/authStore";

export default function Navbar() {

    const user = useAuthStore((state) => state.user);

    return (
        <header
            className="
                sticky
                top-0

                z-40

                h-20

                border-b
                border-white/10

                bg-slate-900/70
                backdrop-blur-xl

                flex
                items-center
                justify-between

                px-8
            "
        >
            <div>
                <h2 className="text-2xl font-bold text-white">
                    Welcome back 👋
                </h2>

                <p className="text-gray-400">
                    {user?.displayName}
                </p>
            </div>

            <div className="flex items-center gap-5">

                <button className="text-2xl hover:text-cyan-400 transition">
                    🔔
                </button>

                <div
                    className="
                        w-12
                        h-12
                        rounded-full
                        bg-gradient-to-r
                        from-purple-600
                        to-cyan-500
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                    "
                >
                    {user?.displayName?.charAt(0)?.toUpperCase()}
                </div>

            </div>
        </header>
    );
}