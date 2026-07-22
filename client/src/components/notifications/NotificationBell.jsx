import { useState } from "react";
import { Bell } from "lucide-react";

import useNotifications from "../../hooks/useNotifications";

import NotificationPanel from "./NotificationPanel";

import { markAllNotificationsRead } from "../../services/notification.service";

export default function NotificationBell() {

    const [open, setOpen] = useState(false);

    const {

        data,

        refetch

    } = useNotifications();

    const notifications = data?.data || [];

    const unreadCount = notifications.filter(

        (notification) => !notification.isRead

    ).length;

    const handleMarkAllRead = async () => {

        try {

            await markAllNotificationsRead();

            await refetch();

        }

        catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="relative">

            <button

                onClick={() => setOpen(!open)}

                className="
                    relative
                    p-2
                    rounded-xl
                    hover:bg-white/10
                    transition
                "

            >

                <Bell

                    className="text-white"

                    size={22}

                />

                {

                    unreadCount > 0 && (

                        <span
                            className="
                                absolute
                                -top-1
                                -right-1
                                min-w-[18px]
                                h-[18px]
                                rounded-full
                                bg-red-500
                                text-white
                                text-[11px]
                                font-bold
                                flex
                                items-center
                                justify-center
                                px-1
                            "
                        >

                            {

                                unreadCount > 9

                                    ? "9+"

                                    : unreadCount

                            }

                        </span>

                    )

                }

            </button>

            {

                open && (

                    <div
                        className="
                            absolute
                            right-0
                            mt-3
                            w-[380px]
                            max-w-[95vw]
                            bg-[#0B1220]
                            border
                            border-white/10
                            rounded-3xl
                            shadow-2xl
                            p-5
                            z-50
                        "
                    >

                        <div className="flex items-start justify-between mb-5">

                            <div>

                                <h2 className="text-xl font-bold text-white">

                                    Notifications

                                </h2>

                                <p className="text-sm text-gray-400 mt-1">

                                    {

                                        unreadCount > 0

                                            ? `${unreadCount} unread`

                                            : "You're all caught up!"

                                    }

                                </p>

                            </div>

                            {

                                unreadCount > 0 && (

                                    <button

                                        onClick={handleMarkAllRead}

                                        className="
                                            text-sm
                                            font-medium
                                            text-cyan-400
                                            hover:text-cyan-300
                                            transition
                                        "

                                    >

                                        Mark all

                                    </button>

                                )

                            }

                        </div>

                        <div
                            className="
                                max-h-[420px]
                                overflow-y-auto
                                pr-1
                            "
                        >

                            <NotificationPanel

                                notifications={notifications}

                            />

                        </div>

                    </div>

                )

            }

        </div>

    );

}