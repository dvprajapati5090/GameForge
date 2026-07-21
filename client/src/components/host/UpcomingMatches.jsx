export default function UpcomingMatches() {

    return (

        <div className="rounded-3xl bg-slate-900 border border-white/10 p-6">

            <h2 className="text-2xl font-black mb-6">

                Upcoming Matches

            </h2>

            <div className="space-y-5">

                <div className="rounded-2xl bg-white/5 p-5">

                    <h3 className="font-bold">

                        Quarter Final

                    </h3>

                    <p className="text-gray-400 mt-2">

                        Team Alpha vs Team Bravo

                    </p>

                    <span className="text-cyan-400">

                        Today • 7:00 PM

                    </span>

                </div>

                <div className="rounded-2xl bg-white/5 p-5">

                    <h3 className="font-bold">

                        Semi Final

                    </h3>

                    <p className="text-gray-400 mt-2">

                        Winner Match 1 vs Winner Match 2

                    </p>

                    <span className="text-cyan-400">

                        Tomorrow • 6:30 PM

                    </span>

                </div>

            </div>

        </div>

    );

}