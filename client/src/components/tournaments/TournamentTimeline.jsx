import {
    CalendarClock,
    Flag,
    Trophy
} from "lucide-react";

export default function TournamentTimeline({

    tournament

}) {

    const events = [

        {
            title: "Registration Opens",
            date: tournament.registrationStart,
            icon: <CalendarClock size={20}/>
        },

        {
            title: "Registration Closes",
            date: tournament.registrationEnd,
            icon: <Flag size={20}/>
        },

        {
            title: "Tournament Starts",
            date: tournament.tournamentStart,
            icon: <Trophy size={20}/>
        }

    ];

    return (

        <div
            className="
                rounded-3xl
                bg-slate-900
                border
                border-white/10
                p-8
            "
        >

            <h2 className="text-2xl font-black mb-8">

                Tournament Timeline

            </h2>

            <div className="space-y-8">

                {

                    events.map((event, index) => (

                        <div
                            key={index}
                            className="flex gap-5 items-start"
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-cyan-500/20
                                    text-cyan-400
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                {event.icon}

                            </div>

                            <div>

                                <h3 className="font-bold text-lg">

                                    {event.title}

                                </h3>

                                <p className="text-gray-400">

                                    {

                                        new Date(
                                            event.date
                                        ).toLocaleString()

                                    }

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}