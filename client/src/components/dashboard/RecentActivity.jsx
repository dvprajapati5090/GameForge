import {
    Trophy,
    UserPlus,
    ShieldCheck,
    Clock
} from "lucide-react";

const activities = [

    {
        icon: Trophy,
        title: "Won Valorant Match",
        time: "2 min ago"
    },

    {
        icon: UserPlus,
        title: "New teammate joined",
        time: "10 min ago"
    },

    {
        icon: ShieldCheck,
        title: "Team verified",
        time: "Today"
    },

    {
        icon: Clock,
        title: "Tournament starts tomorrow",
        time: "Tomorrow"
    }

];

export default function RecentActivity() {

    return (

        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
            "
        >

            <h2 className="text-2xl font-bold mb-6">
                Recent Activity
            </h2>

            <div className="space-y-5">

                {

                    activities.map((item, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-slate-800
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <item.icon
                                    size={22}
                                    className="text-cyan-400"
                                />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    {item.title}

                                </h3>

                                <p className="text-gray-400 text-sm">

                                    {item.time}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}