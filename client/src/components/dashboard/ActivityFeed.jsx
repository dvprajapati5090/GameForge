import { motion } from "framer-motion";
import {
    Trophy,
    Users,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";

const activities = [
    {
        icon: <Trophy className="text-yellow-400" size={20} />,
        title: "Won Valorant Match",
        time: "2 mins ago"
    },
    {
        icon: <Users className="text-cyan-400" size={20} />,
        title: "New player joined your team",
        time: "15 mins ago"
    },
    {
        icon: <ShieldCheck className="text-purple-400" size={20} />,
        title: "Team verified successfully",
        time: "1 hour ago"
    },
    {
        icon: <CheckCircle2 className="text-green-400" size={20} />,
        title: "Tournament registration approved",
        time: "Today"
    }
];

export default function ActivityFeed() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

                {activities.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-4"
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
                            {item.icon}
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-400">
                                {item.time}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </motion.div>
    );
}