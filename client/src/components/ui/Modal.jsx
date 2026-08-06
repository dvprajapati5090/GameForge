import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
    open,
    onClose,
    title,
    children
}) {
    // Lock body scroll when modal is open — prevents page jumping to top
    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    if (!open) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.72)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                padding: 16,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 560,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    borderRadius: 22,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(8,2,14,0.97)',
                    backdropFilter: 'blur(28px)',
                    padding: 32,
                    boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                    }}
                >
                    <X size={16} />
                </button>

                {title && (
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>
                        {title}
                    </h2>
                )}

                {children}
            </div>
        </div>
    );
}