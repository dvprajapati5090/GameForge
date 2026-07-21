import {

    Trophy,

    Users,

    PlayCircle,

    Calendar

} from "lucide-react";

const cards = [

    {

        title: "Total Tournaments",

        value: 0,

        icon: Trophy

    },

    {

        title: "Live Events",

        value: 0,

        icon: PlayCircle

    },

    {

        title: "Teams Registered",

        value: 0,

        icon: Users

    },

    {

        title: "Upcoming Matches",

        value: 0,

        icon: Calendar

    }

];

export default function HostStats() {

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            {

                cards.map((card) => (

                    <div

                        key={card.title}

                        className="
                            rounded-3xl

                            border
                            border-white/10

                            bg-slate-900

                            p-7
                        "

                    >

                        <card.icon
                            size={28}
                            className="text-cyan-400"
                        />

                        <p className="mt-5 text-gray-400">

                            {card.title}

                        </p>

                        <h2 className="text-4xl font-black mt-2">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}