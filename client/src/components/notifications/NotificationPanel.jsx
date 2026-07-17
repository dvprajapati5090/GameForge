import { motion } from "framer-motion";

import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

export default function NotificationPanel({

    invitations

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: -10,
                scale: 0.98
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            exit={{
                opacity: 0,
                y: -10,
                scale: 0.98
            }}

            transition={{
                duration: 0.2
            }}

            className="
                absolute
                right-0
                top-14
                w-[390px]
                rounded-3xl
                border
                border-white/10
                bg-slate-900/95
                backdrop-blur-xl
                shadow-2xl
                overflow-hidden
                z-50
            "

        >

            <div
                className="
                    px-6
                    py-5
                    border-b
                    border-white/10
                "
            >

                <h2 className="text-xl font-black">

                    Notifications

                </h2>

                <p className="text-sm text-gray-400 mt-1">

                    {

                        invitations.length

                            ? `${invitations.length} pending invitation${invitations.length > 1 ? "s" : ""}`

                            : "You're all caught up 🎉"

                    }

                </p>

            </div>

            <div
                className="
                    max-h-[450px]
                    overflow-y-auto
                    p-4
                    space-y-4
                "
            >

                {

                    invitations.length

                        ? invitations.map((invitation) => (

                            <NotificationCard

                                key={invitation._id}

                                invitation={invitation}

                            />

                        ))

                        : <EmptyNotifications />

                }

            </div>

        </motion.div>

    );

}