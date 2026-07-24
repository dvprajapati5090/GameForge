import { useEffect, useRef, useState } from "react";

import useTeamChat from "../../hooks/useTeamChat";
import useSendMessage from "../../hooks/useSendMessage";
import useMyTeam from "../../hooks/useMyTeam";

import MessageBubble from "./MessageBubble";

import socket from "../../socket/socket";

export default function TeamChat() {

    const { data: teamData } = useMyTeam();

    const team = teamData?.data;

    const {
        data,
        isLoading
    } = useTeamChat();

    const sendMutation = useSendMessage();

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const bottomRef = useRef(null);

    // Load messages from API
    useEffect(() => {

        if (data?.data) {

            setMessages(data.data);

        }

    }, [data]);

    // Join socket room
    useEffect(() => {

        if (!team?._id) return;

        if (!socket.connected) {

            socket.connect();

        }

        socket.emit(
            "join-team",
            team._id
        );

        return () => {

            socket.emit(
                "leave-team",
                team._id
            );

        };

    }, [team?._id]);

    // Receive live messages
    useEffect(() => {

        const handleMessage = (newMessage) => {

            setMessages((prev) => {

                if (
                    prev.some(
                        m => m._id === newMessage._id
                    )
                ) {
                    return prev;
                }

                return [
                    ...prev,
                    newMessage
                ];

            });

        };

        socket.on(
            "team-message",
            handleMessage
        );

        return () => {

            socket.off(
                "team-message",
                handleMessage
            );

        };

    }, []);

    // Auto scroll
    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    const handleSend = () => {

        if (!message.trim()) return;

        sendMutation.mutate(

            message,

            {

                onSuccess: () => {

                    setMessage("");

                }

            }

        );

    };

    if (isLoading) {

        return (

            <div
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900
                    p-6
                "
            >
                Loading chat...
            </div>

        );

    }

    return (

        <section
            className="
                mt-10
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-b
                from-slate-900
                to-slate-950
                overflow-hidden
            "
        >

            <div
                className="
                    px-6
                    py-4
                    border-b
                    border-white/10
                "
            >

                <h2 className="text-2xl font-black">

                    Team Chat

                </h2>

            </div>

            <div
                className="
                    h-[450px]
                    overflow-y-auto
                    p-6
                    space-y-4
                "
            >

                {
                    messages.length === 0 && (

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                h-full
                                text-center
                                text-gray-400
                            "
                        >

                            <div className="text-5xl mb-4">

                                🎮

                            </div>

                            <h3 className="text-xl font-bold text-white">

                                Team Chat

                            </h3>

                            <p className="mt-3">

                                This is your private team room.

                            </p>

                            <p>

                                Only your teammates can see these messages.

                            </p>

                            <p className="mt-4">

                                Say hello 👋

                            </p>

                        </div>

                    )
                }

                {
                    messages.map((msg) => (

                        <MessageBubble

                            key={msg._id}

                            message={msg}

                        />

                    ))
                }

                <div ref={bottomRef} />

            </div>

            <div
                className="
                    border-t
                    border-white/10
                    p-4
                    flex
                    gap-3
                "
            >

                <input

                    value={message}

                    onChange={(e) =>
                        setMessage(e.target.value)
                    }

                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !e.shiftKey
                        ) {

                            e.preventDefault();

                            handleSend();

                        }

                    }}

                    placeholder="Message your teammates..."

                    className="
                        flex-1
                        rounded-xl
                        bg-slate-800
                        border
                        border-white/10
                        px-4
                        py-3
                        outline-none
                    "

                />

                <button

                    onClick={handleSend}

                    disabled={
                        !message.trim() ||
                        sendMutation.isPending
                    }

                    className="
                        px-6
                        rounded-xl
                        bg-cyan-500
                        text-black
                        font-bold
                        hover:bg-cyan-400
                        transition
                    "

                >

                    Send

                </button>

            </div>

        </section>

    );

}