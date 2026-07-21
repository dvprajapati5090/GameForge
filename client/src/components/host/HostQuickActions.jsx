import {
    PlusCircle,
    ListChecks,
    GitBranch,
    Users
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
    {
        title: "Create Tournament",
        icon: PlusCircle,
        path: "/host/create-tournament",
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "My Tournaments",
        icon: ListChecks,
        path: "/host/tournaments",
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Generate Brackets",
        icon: GitBranch,
        path: "/host/tournaments",
        color: "from-green-500 to-emerald-600"
    },
    {
        title: "Registered Teams",
        icon: Users,
        path: "/host/tournaments",
        color: "from-orange-500 to-red-500"
    }
];

export default function HostQuickActions() {

    const navigate = useNavigate();

    return (

        <div className="rounded-3xl bg-slate-900 border border-white/10 p-6">

            <h2 className="text-2xl font-black mb-6">

                Quick Actions

            </h2>

            <div className="space-y-4">

                {

                    actions.map(action => (

                        <button

                            key={action.title}

                            onClick={() => navigate(action.path)}

                            className={`
                                w-full
                                rounded-2xl
                                p-5

                                bg-gradient-to-r
                                ${action.color}

                                flex
                                items-center
                                gap-4

                                hover:scale-[1.02]
                                transition
                            `}

                        >

                            <action.icon size={24}/>

                            <span className="font-bold">

                                {action.title}

                            </span>

                        </button>

                    ))

                }

            </div>

        </div>

    );

}