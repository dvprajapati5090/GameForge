import {
    Plus,
    Trophy,
    Users,
    Shield
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
                Quick Actions
            </h2>

            <div className="space-y-4">

                {

                    actions.map((action) => (

                        <button
                            key={action.title}
                            className="
                                w-full
                                flex
                                items-center
                                gap-4
                                rounded-2xl
                                bg-slate-900/60
                                border
                                border-white/10
                                px-5
                                py-4
                                hover:border-cyan-500
                                hover:bg-slate-800
                                transition
                            "
                        >

                            <action.icon
                                className="text-cyan-400"
                            />

                            <span className="font-medium">

                                {action.title}

                            </span>

                        </button>

                    ))

                }

            </div>

        </div>

    );

}