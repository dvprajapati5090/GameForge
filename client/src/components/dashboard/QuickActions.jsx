import {
    Plus,
    Trophy,
    Users,
    Shield,
    Sparkles,
    ArrowRight
} from "lucide-react";

const actions = [

    {
        icon: Plus,
        title: "Create Team"
    },

    {
        icon: Users,
        title: "Find Players"
    },

    {
        icon: Trophy,
        title: "Join Tournament"
    },

    {
        icon: Shield,
        title: "Manage Team"
    }

];

export default function QuickActions() {

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
                    -right-24
                    -bottom-24

                    h-72
                    w-72

                    rounded-full

                    bg-violet-500/10

                    blur-[130px]
                "
            />

            <div className="relative z-10">

                {/* Header */}

                <div className="mb-7">

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

                        <Sparkles size={14} />

                        Control Center

                    </div>

                    <h2
                        className="
                            mt-4

                            text-3xl
                            font-bold

                            text-white
                        "
                    >
                        Quick Actions
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">

                        Access your most-used GameForge features instantly.

                    </p>

                </div>

                <div className="space-y-4">

                    {

                        actions.map((action) => (

                            <button
                                key={action.title}
                                className="
                                    group

                                    w-full

                                    flex
                                    items-center
                                    justify-between

                                    rounded-2xl

                                    border
                                    border-white/10

                                    bg-white/5

                                    px-5
                                    py-4

                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:border-violet-400/30
                                    hover:bg-violet-500/5
                                    hover:shadow-[0_0_20px_rgba(139,92,246,0.12)]
                                "
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
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

                                        <action.icon
                                            size={22}
                                            className="text-violet-300"
                                        />

                                    </div>

                                    <span
                                        className="
                                            text-base
                                            font-semibold

                                            text-white
                                        "
                                    >
                                        {action.title}
                                    </span>

                                </div>

                                <ArrowRight
                                    size={18}
                                    className="
                                        text-slate-500

                                        transition-all
                                        duration-300

                                        group-hover:translate-x-1
                                        group-hover:text-violet-300
                                    "
                                />

                            </button>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}