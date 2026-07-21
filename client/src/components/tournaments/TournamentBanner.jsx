export default function TournamentBanner({

    tournament

}) {

    return (

        <div
            className="
                rounded-xl
                overflow-hidden
                border
                border-cyan-500/20
                bg-[#111827]
            "
        >

            <img

                src={
                    tournament.banner ||
                    "https://placehold.co/1600x350"
                }

                className="w-full h-72 object-cover"

            />

            <div className="p-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">

                            {tournament.name}

                        </h1>

                        <p className="text-gray-400 mt-2">

                            {tournament.game}

                        </p>

                    </div>

                    <div className="text-right">

                        <div className="text-green-400 font-bold">

                            {tournament.status}

                        </div>

                        <div className="text-2xl mt-2">

                            ₹{tournament.prizePool}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}