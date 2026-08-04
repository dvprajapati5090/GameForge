/**
 * MessageBubble — Silver/black glassy gaming theme
 */
import useAuthStore from "../../store/authStore";
import getProfileImage from "../../utils/getProfileImage";

const F = '"Space Mono", monospace';

export default function MessageBubble({ message }) {
    const { user } = useAuthStore();
    const mine = message.sender._id === user?._id;
    const profileImage = getProfileImage(message.sender);

    const time = new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit", minute: "2-digit",
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: mine ? 'flex-end' : 'flex-start',
            marginBottom: 14,
        }}>
            <div style={{
                display: 'flex',
                flexDirection: mine ? 'row-reverse' : 'row',
                gap: 10,
                maxWidth: '72%',
                alignItems: 'flex-end',
            }}>
                {/* Avatar */}
                <img
                    src={profileImage}
                    alt={message.sender.displayName}
                    style={{
                        width: 32, height: 32, borderRadius: 10,
                        objectFit: 'cover', flexShrink: 0,
                        border: mine ? '1.5px solid rgba(232,0,61,0.4)' : '1.5px solid rgba(192,192,192,0.2)',
                        boxShadow: mine ? '0 0 8px rgba(232,0,61,0.2)' : 'none',
                    }}
                />

                <div>
                    {/* Name + time */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        justifyContent: mine ? 'flex-end' : 'flex-start',
                        marginBottom: 5,
                    }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: mine ? '#e8003d' : 'rgba(192,192,192,0.7)', fontFamily: F }}>
                            {message.sender.displayName}
                        </span>
                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: F, letterSpacing: '0.06em' }}>
                            {time}
                        </span>
                    </div>

                    {/* Bubble */}
                    <div style={{
                        padding: '10px 14px',
                        borderRadius: mine ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                        background: mine
                            ? 'rgba(232,0,61,0.14)'
                            : 'rgba(192,192,192,0.07)',
                        border: mine
                            ? '1px solid rgba(232,0,61,0.35)'
                            : '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: F,
                        lineHeight: 1.6,
                        wordBreak: 'break-word',
                        boxShadow: mine
                            ? '0 0 14px rgba(232,0,61,0.12)'
                            : '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                        {message.text}
                    </div>
                </div>
            </div>
        </div>
    );
}