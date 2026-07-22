import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getNotifications } from "../services/notification.service";

import socket from "../socket/socket";

export default function useNotifications() {

    const queryClient = useQueryClient();

    const query = useQuery({

        queryKey: ["notifications"],

        queryFn: getNotifications

    });

    useEffect(() => {

        const handleNotification = (notification) => {

            console.log("🔔 Notification received", notification);

            queryClient.setQueryData(

                ["notifications"],

                (oldData) => {

                    if (!oldData) {

                        return {

                            data: [

                                notification

                            ]

                        };

                    }

                    return {

                        ...oldData,

                        data: [

                            notification,

                            ...oldData.data

                        ]

                    };

                }

            );

        };

        socket.on(

            "notification",

            handleNotification

        );

        return () => {

            socket.off(

                "notification",

                handleNotification

            );

        };

    }, []);

    return query;

}