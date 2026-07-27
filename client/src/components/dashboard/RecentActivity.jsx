import {
    Trophy,
    UserPlus,
    ShieldCheck,
    Clock,
    Activity
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

        <section
            className="
                relative
                overflow-hidden

                rounded-3xl

                border
                border-white/10

                bg-[#101624]

                backdrop-blur-2xl

                p-6

                transition-all
                duration-300

                hover:border-violet-500/20
                hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]
            "
        >

            {/* Ambient Glow */}

            <div
                className="
                    absolute
                    -left-20
                    -top-20

                    h-60
                    w-60

                    rounded-full

                    bg-violet-500/10

                    blur-[120px]
                "
            />

            <div className="relative z-10">

                {/* Header */}

                <div className="mb-7 flex items-center justify-between">

                    <div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2

                                rounded-full

                                border
                                border-violet-500/20

                                bg-violet-500/10

                                px-3
                                py-1

                                text-xs
                                font-semibold

                                uppercase

                                tracking-[2px]

                                text-violet-300
                            "
                        >

                            <Activity size={14} />

                            Live Feed

                        </div>

                        <h2
                            className="
                                mt-4

                                text-3xl
                                font-bold

                                text-white
                            "
                        >
                            Recent Activity
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">

                            Latest updates from your team and tournaments.

                        </p>

                    </div>

                </div>

                <div className="space-y-4">

                    {

                        activities.map((item, index) => (

                            <div
                                key={index}
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-between

                                    rounded-2xl

                                    border
                                    border-white/10

                                    bg-white/5

                                    p-4

                                    transition-all
                                    duration-300

                                    hover:border-violet-400/25
                                    hover:bg-violet-500/5
                                    hover:-translate-y-1
                                "
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            relative

                                            flex
                                            h-12
                                            w-12

                                            items-center
                                            justify-center

                                            rounded-2xl

                                            border
                                            border-violet-500/20

                                            bg-violet-500/10
                                        "
                                    >

                                        <item.icon
                                            size={20}
                                            className="text-violet-300"
                                        />

                                    </div>

                                    <div>

                                        <h3
                                            className="
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-1

                                                text-sm

                                                text-slate-400
                                            "
                                        >
                                            {item.time}
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className="
                                        h-2.5
                                        w-2.5

                                        rounded-full

                                        bg-emerald-400

                                        shadow-[0_0_12px_rgba(74,222,128,0.8)]
                                    "
                                />

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}