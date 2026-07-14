import useAuthStore from "../../store/authStore";

export default function FavouriteGames() {

    const user = useAuthStore((state) => state.user);

    return (

        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
            "
        >

            <h2 className="text-3xl font-bold mb-6">
                Favourite Games
            </h2>

            <div className="flex flex-wrap gap-4">

                {user?.favoriteGames?.map((game) => (

                    <span
                        key={game}
                        className="
                            px-5
                            py-3
                            rounded-full
                            bg-gradient-to-r
                            from-purple-600/60
                            to-cyan-500/60
                        "
                    >
                        {game}
                    </span>

                ))}

            </div>

        </div>

    );

}