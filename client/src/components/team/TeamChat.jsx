/**
 * TeamChat — Red/Silver gaming glass theme
 */
import { useEffect, useRef, useState } from "react";
import useTeamChat from "../../hooks/useTeamChat";
import useSendMessage from "../../hooks/useSendMessage";
import useMyTeam from "../../hooks/useMyTeam";
import MessageBubble from "./MessageBubble";
import socket from "../../socket/socket";
import { Send, MessageSquare } from "lucide-react";

const F = '"Space Mono", monospace';

export default function TeamChat() {
    const { data: teamData } = useMyTeam();
    const team = teamData?.data;
    const { data, isLoading } = useTeamChat();
    const sendMutation = useSendMessage();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputFocused, setInputFocused] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (data?.data) setMessages(data.data);
    }, [data]);

    useEffect(() => {
        if (!team?._id) return;
        if (!socket.connected) socket.connect();
        socket.emit("join-team", team._id);
        return () => { socket.emit("leave-team", team._id); };
    }, [team?._id]);

    useEffect(() => {
        const handleMessage = (newMessage) => {
            setMessages((prev) => {
                if (prev.some(m => m._id === newMessage._id)) return prev;
                return [...prev, newMessage];
            });
        };
        socket.on("team-message", handleMessage);
        return () => { socket.off("team-message", handleMessage); };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;
        sendMutation.mutate(message, { onSuccess: () => { setMessage(""); } });
    };

    if (isLoading) {
        return (
            <div style={{
                marginTop: 24,
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22,
                background: 'rgba(7,0,10,0.65)', backdropFilter: 'blur(20px)',
                padding: 24, fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)',
                textAlign: 'center', letterSpacing: '0.1em',
            }}>
                LOADING CHAT...
            </div>
        );
    }

    return (
        <section style={{
            marginTop: 24,
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(192,192,192,0.12)',
            borderTop: '2px solid #e8003d',
            borderRadius: 22,
            background: 'rgba(7,0,10,0.72)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            fontFamily: F,
            boxShadow: '0 0 32px rgba(232,0,61,0.06), 0 16px 48px rgba(0,0,0,0.45)',
        }}>
            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.06) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }} />

            {/* Header */}
            <div style={{
                position: 'relative', zIndex: 2,
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#e8003d', padding: '4px 12px', borderRadius: 999,
                }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', animation: 'ra-dot-pulse 1.6s ease-in-out infinite' }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Team Chat</span>
                </div>
                <MessageSquare size={14} color="rgba(192,192,192,0.4)" />
            </div>

            {/* Messages area */}
            <div style={{
                position: 'relative', zIndex: 1,
                height: 420, overflowY: 'auto',
                padding: '20px 24px',
                display: 'flex', flexDirection: 'column', gap: 2,
            }}>
                {messages.length === 0 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', height: '100%', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: 44, marginBottom: 16 }}>🎮</div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Team Chat</h3>
                        <p style={{ fontSize: 11, color: 'rgba(192,192,192,0.4)', letterSpacing: '0.04em' }}>
                            This is your private team room.<br />
                            Only your teammates can see messages.
                        </p>
                        <p style={{ fontSize: 11, color: 'rgba(232,0,61,0.6)', marginTop: 12, letterSpacing: '0.08em' }}>Say hello 👋</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <MessageBubble key={msg._id} message={msg} />
                ))}

                <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div style={{
                position: 'relative', zIndex: 2,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '14px 18px',
                display: 'flex', gap: 10, alignItems: 'center',
            }}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                    }}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Message your teammates..."
                    style={{
                        flex: 1,
                        padding: '11px 16px',
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${inputFocused ? 'rgba(232,0,61,0.5)' : 'rgba(255,255,255,0.09)'}`,
                        borderRadius: 12,
                        color: '#fff', fontSize: 12, fontFamily: F, outline: 'none',
                        transition: 'border-color 0.2s',
                        boxShadow: inputFocused ? '0 0 10px rgba(232,0,61,0.12)' : 'none',
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={!message.trim() || sendMutation.isPending}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        padding: '11px 20px', borderRadius: 12,
                        background: (!message.trim() || sendMutation.isPending)
                            ? 'rgba(232,0,61,0.3)'
                            : 'linear-gradient(135deg, #e8003d, #b5002e)',
                        border: '1px solid rgba(232,0,61,0.4)',
                        color: '#fff', fontSize: 11, fontFamily: F,
                        fontWeight: 700, letterSpacing: '0.06em',
                        cursor: (!message.trim() || sendMutation.isPending) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: (!message.trim() || sendMutation.isPending) ? 'none' : '0 0 16px rgba(232,0,61,0.3)',
                        flexShrink: 0,
                    }}
                >
                    <Send size={13} />
                    Send
                </button>
            </div>
        </section>
    );
}