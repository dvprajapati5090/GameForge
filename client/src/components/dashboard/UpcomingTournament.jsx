export default function UpcomingTournament({ tournament }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-slate-900/60
                backdrop-blur-xl
                p-5
                transition-all
                duration-300
                hover:border-cyan-500/40
                hover:-translate-y-1
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <h3 className="text-lg font-bold text-white">
                        {tournament.title}
                    </h3>

                    <p className="text-gray-400 mt-1">
                        {tournament.game}
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-cyan-400 font-semibold">
                        {tournament.date}
                    </p>

                    <p className="text-sm text-gray-400">
                        {tournament.teams} Teams
                    </p>

                </div>

            </div>

        </div>

    );

}