import { useState } from "react";
import clsx from "clsx";
import {
    Trophy,
    Users,
    Sword,
    Bell,
    Gamepad2,
    ShieldCheck
} from "lucide-react";

import {
    acceptInvitation,
    rejectInvitation
} from "../../services/team.service";

import { useQueryClient } from "@tanstack/react-query";

import timeAgo from "../../utils/timeAgo";

export default function NotificationItem({

    notification

}) {

    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    const styles = {

        ACHIEVEMENT: {

            icon: Trophy,

            iconColor: "text-yellow-400",

            border: "border-yellow-500/40",

            bg: "bg-yellow-500/10"

        },

        INVITATION: {

            icon: Users,

            iconColor: "text-cyan-400",

            border: "border-cyan-500/40",

            bg: "bg-cyan-500/10"

        },

        MATCH_READY: {

            icon: Sword,

            iconColor: "text-red-400",

            border: "border-red-500/40",

            bg: "bg-red-500/10"

        },

        TOURNAMENT: {

            icon: Gamepad2,

            iconColor: "text-purple-400",

            border: "border-purple-500/40",

            bg: "bg-purple-500/10"

        },

        RIOT: {

            icon: ShieldCheck,

            iconColor: "text-green-400",

            border: "border-green-500/40",

            bg: "bg-green-500/10"

        },

        SYSTEM: {

            icon: Bell,

            iconColor: "text-gray-300",

            border: "border-white/10",

            bg: "bg-white/10"

        }

    };

    const config =

        styles[notification.type] ||

        styles.SYSTEM;

    const Icon = config.icon;

    const removeNotificationFromCache = () => {

        queryClient.setQueryData(

            ["notifications"],

            (oldData) => {

                if (!oldData) return oldData;

                return {

                    ...oldData,

                    data: oldData.data.filter(

                        (n) => n._id !== notification._id

                    )

                };

            }

        );

    };

    const handleAccept = async () => {

        if (loading) return;

        try {

            setLoading(true);

            await acceptInvitation(

                notification.invitation._id

            );

            removeNotificationFromCache();

            await queryClient.invalidateQueries({

                queryKey: ["notifications"]

            });

            await queryClient.invalidateQueries({

                queryKey: ["team"]

            });

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    const handleReject = async () => {

        if (loading) return;

        try {

            setLoading(true);

            await rejectInvitation(

                notification.invitation._id

            );

            removeNotificationFromCache();

            await queryClient.invalidateQueries({

                queryKey: ["notifications"]

            });

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div

            className={clsx(

                "relative",

                "rounded-2xl",

                "border",

                config.border,

                "bg-[#1b2333]",

                "p-4",

                "transition-all",

                "duration-200",

                "hover:bg-cyan-500/5",

                "hover:scale-[1.01]"

            )}

        >

            {

                !notification.isRead && (

                    <div

                        className="

                            absolute

                            top-4

                            right-4

                            w-3

                            h-3

                            rounded-full

                            bg-cyan-400

                        "

                    />

                )

            }

            <div className="flex gap-4">

                <div

                    className={clsx(

                        "w-12",

                        "h-12",

                        "rounded-full",

                        "flex",

                        "items-center",

                        "justify-center",

                        config.bg

                    )}

                >

                    <Icon

                        size={22}

                        className={config.iconColor}

                    />

                </div>

                <div className="flex-1">

                    {

                        notification.type === "ACHIEVEMENT"

                            ? (

                                <>

                                    <h3 className="font-semibold text-white">

                                        {

                                            notification.message.replace(

                                                "🏆 ",

                                                ""

                                            )

                                        }

                                    </h3>

                                    <p className="text-sm text-gray-400 mt-1">

                                        Achievement Unlocked

                                    </p>

                                </>

                            )

                            : (

                                <>

                                    <h3 className="font-semibold text-white">

                                        {notification.title}

                                    </h3>

                                    <p className="text-sm text-gray-400 mt-1">

                                        {notification.message}

                                    </p>

                                </>

                            )

                    }

                    {

                        notification.type === "INVITATION" &&

                        notification.invitation && (

                            <div className="flex gap-2 mt-4">

                                <button

                                    disabled={loading}

                                    onClick={handleAccept}

                                    className="

                                        flex-1

                                        py-2

                                        rounded-lg

                                        bg-green-600

                                        hover:bg-green-700

                                        disabled:bg-green-800

                                        disabled:cursor-not-allowed

                                        transition

                                        text-white

                                        text-sm

                                        font-semibold

                                    "

                                >

                                    {

                                        loading

                                            ? "Accepting..."

                                            : "Accept"

                                    }

                                </button>

                                <button

                                    disabled={loading}

                                    onClick={handleReject}

                                    className="

                                        flex-1

                                        py-2

                                        rounded-lg

                                        bg-red-600

                                        hover:bg-red-700

                                        disabled:bg-red-800

                                        disabled:cursor-not-allowed

                                        transition

                                        text-white

                                        text-sm

                                        font-semibold

                                    "

                                >

                                    {

                                        loading

                                            ? "Rejecting..."

                                            : "Reject"

                                    }

                                </button>

                            </div>

                        )

                    }

                    <p className="text-xs text-gray-500 mt-3">

                        {

                            timeAgo(

                                notification.createdAt

                            )

                        }

                    </p>

                </div>

            </div>

        </div>

    );

}