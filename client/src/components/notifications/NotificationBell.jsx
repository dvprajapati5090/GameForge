import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import useInvitations from "../../hooks/useInvitations";
import NotificationPanel from "./NotificationPanel";

export default function NotificationBell() {

    const [open, setOpen] = useState(false);

    const { data } = useInvitations();

    const invitations = data?.data || [];

    return (

        <div className="relative">

            <motion.button

                whileHover={{ scale: 1.08 }}

                whileTap={{ scale: 0.96 }}

                onClick={() => setOpen(!open)}

                className="
                    relative
                    rounded-xl
                    p-2
                    hover:bg-white/5
                    transition
                "

            >

                <Bell size={23} />

                {

                    invitations.length > 0 && (

                        <motion.span

                            initial={{ scale: 0 }}

                            animate={{ scale: 1 }}

                            className="
                                absolute
                                -top-1
                                -right-1
                                w-5
                                h-5
                                rounded-full
                                bg-red-500
                                text-xs
                                flex
                                items-center
                                justify-center
                                font-bold
                            "

                        >

                            {invitations.length}

                        </motion.span>

                    )

                }

            </motion.button>

            <AnimatePresence>

                {

                    open && (

                        <NotificationPanel

                            invitations={invitations}

                            onClose={() => setOpen(false)}

                        />

                    )

                }

            </AnimatePresence>

        </div>

    );

}