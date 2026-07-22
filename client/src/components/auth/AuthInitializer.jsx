import { useEffect, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";

import useAuthStore from "../../store/authStore";
import { getCurrentUser } from "../../services/auth.service";
import api from "../../api/axios";

import socket from "../../socket/socket";

import toast from "react-hot-toast";

import notificationSound from "../../assets/sounds/notification.mp3";

import {

    Trophy,

    Users,

    Sword,

    Bell,

    Gamepad2,

    Crown

} from "lucide-react";

export default function AuthInitializer({ children }) {

    const audioRef = useRef(
        new Audio(notificationSound)
    );

    audioRef.current.volume = 0.35;

    const {

        accessToken,

        user,

        setAccessToken,

        setUser,

        authLoading,

        setAuthLoading,

        logout

    } = useAuthStore();

    const queryClient = useQueryClient();

    const initialized = useRef(false);

    useEffect(() => {

        if (initialized.current)
            return;

        initialized.current = true;

        const initialize = async () => {

            try {

                let token = accessToken;

                if (!token) {

                    const response = await api.post(

                        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,

                        {},

                        {

                            withCredentials: true

                        }

                    );

                    token = response.data.data.accessToken;

                    setAccessToken(token);

                }

                const userResponse = await getCurrentUser();

                setUser(userResponse.data);

            }

            catch (error) {

                console.log(

                    "Auth initialization failed:",

                    error.message

                );

                socket.disconnect();

                logout();

            }

            finally {

                setAuthLoading(false);

            }

        };

        initialize();

    }, []);

    useEffect(() => {

        if (!user) {

            socket.disconnect();

            return;

        }

        if (!socket.connected) {

            socket.connect();

        }

        const handleConnect = () => {

            console.log("✅ Socket connected");

            socket.emit(
                "join",
                user._id
            );

        };

        const handleTeamUpdated = () => {

            queryClient.invalidateQueries({
                queryKey: ["team"]
            });

        };

        const handleTournamentUpdated = () => {

            queryClient.invalidateQueries({
                queryKey: ["tournaments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["tournament"]
            });

            queryClient.invalidateQueries({
                queryKey: ["bracket"]
            });

            queryClient.invalidateQueries({
                queryKey: ["matches"]
            });

        };

        const handleBracketUpdated = () => {

            queryClient.invalidateQueries({

                queryKey: ["bracket"]

            });

            queryClient.invalidateQueries({

                queryKey: ["tournament"]

            });

            queryClient.invalidateQueries({

                queryKey: ["matches"]

            });

        };

        const handleNotification = (notification) => {

            queryClient.setQueryData(

                ["notifications"],

                (old) => {

                    if (!old) {

                        return {

                            success: true,

                            data: [notification]

                        };

                    }

                    return {

                        ...old,

                        data: [

                            notification,

                            ...old.data.filter(
                                n => n._id !== notification._id
                            )

                        ]

                    };

                }

            );

            queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });

            audioRef.current.currentTime = 0;

            audioRef.current.play().catch(() => {});

            const styles = {

                ACHIEVEMENT: {

                    icon: Trophy,

                    color: "text-yellow-400",

                    border: "border-yellow-500/40",

                    bg: "bg-yellow-500/10"

                },

                INVITATION: {

                    icon: Users,

                    color: "text-cyan-400",

                    border: "border-cyan-500/40",

                    bg: "bg-cyan-500/10"

                },

                MATCH_READY: {

                    icon: Sword,

                    color: "text-red-400",

                    border: "border-red-500/40",

                    bg: "bg-red-500/10"

                },

                TOURNAMENT: {

                    icon: Gamepad2,

                    color: "text-purple-400",

                    border: "border-purple-500/40",

                    bg: "bg-purple-500/10"

                },

                TEAM: {

                    icon: Crown,

                    color: "text-green-400",

                    border: "border-green-500/40",

                    bg: "bg-green-500/10"

                },

                SYSTEM: {

                    icon: Bell,

                    color: "text-blue-400",

                    border: "border-blue-500/40",

                    bg: "bg-blue-500/10"

                }

            };

            const config =
                styles[notification.type] ||
                styles.SYSTEM;

            const Icon = config.icon;

            toast.custom(() => (

                <div
                    className="
                        w-96
                        rounded-2xl
                        border
                        bg-[#0B1220]
                        p-4
                        shadow-2xl
                        flex
                        gap-4
                    "
                >

                    <div
                        className={`
                            w-12
                            h-12
                            rounded-full
                            flex
                            items-center
                            justify-center
                            ${config.bg}
                        `}
                    >

                        <Icon
                            size={22}
                            className={config.color}
                        />

                    </div>

                    <div className="flex-1">

                        <h3
                            className={`font-bold ${config.color}`}
                        >
                            {notification.title}
                        </h3>

                        <p className="text-sm text-gray-300 mt-1">
                            {notification.message}
                        </p>

                    </div>

                </div>

            ));

        };

        socket.on("connect", handleConnect);
        socket.on("teamUpdated", handleTeamUpdated);
        socket.on("tournamentUpdated", handleTournamentUpdated);
        socket.on("notification:new", handleNotification);

        socket.on("bracketUpdated",handleBracketUpdated);

        if (socket.connected) {

            handleConnect();

        }

        return () => {

            socket.off("connect", handleConnect);
            socket.off("teamUpdated", handleTeamUpdated);
            socket.off("tournamentUpdated", handleTournamentUpdated);
            socket.off("notification:new", handleNotification);
            socket.off("bracketUpdated",handleBracketUpdated);
            
        };

    }, [user, queryClient]);

    return children;

}