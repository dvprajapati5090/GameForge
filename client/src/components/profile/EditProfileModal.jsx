import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Gamepad2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import useAuthStore from "../../store/authStore";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const F = '"Space Mono", monospace';
const GAMES = ["Valorant", "CS2", "BGMI", "Rocket League", "Apex Legends", "League of Legends"];

export default function EditProfileModal({ open, onClose }) {
    const user = useAuthStore((state) => state.user);

    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [selectedGames, setSelectedGames] = useState(user?.favoriteGames || []);
    const [avatarFile, setAvatarFile] = useState(null);

    const fileInputRef = useRef(null);
    const updateProfileMutation = useUpdateProfile();

    useEffect(() => {
        if (open) {
            setDisplayName(user?.displayName || "");
            setBio(user?.bio || "");
            setSelectedGames(user?.favoriteGames || []);
            setAvatarFile(null);
        }
    }, [open, user]);

    const toggleGame = (game) => {
        setSelectedGames(prev =>
            prev.includes(game) ? prev.filter(g => g !== game) : [...prev, game]
        );
    };

    if (!open) return null;

    const inputStyle = {
        width: '100%',
        padding: '11px 14px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12,
        color: '#fff',
        fontSize: 12,
        fontFamily: F,
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    };

    const labelStyle = {
        display: 'block',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: 8,
    };

    return (
        <AnimatePresence>
            {/* Backdrop — zIndex: 400 beats sidebar (300) */}
            <motion.div
                key="edit-profile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    zIndex: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}
            >
                {/* Modal panel */}
                <motion.div
                    key="edit-profile-panel"
                    initial={{ opacity: 0, scale: 0.92, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 32 }}
                    transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        zIndex: 401,
                        width: '100%',
                        maxWidth: 560,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        background: 'rgba(8,2,14,0.95)',
                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',
                        border: '1px solid rgba(232,0,61,0.2)',
                        borderTop: '2px solid #e8003d',
                        borderRadius: 22,
                        padding: '32px',
                        fontFamily: F,
                        boxShadow: '0 0 60px rgba(232,0,61,0.12), 0 24px 80px rgba(0,0,0,0.7)',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                        <div>
                            <p style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>
                                // AGENT SETTINGS
                            </p>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                                Edit Profile
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: 36, height: 36, borderRadius: 10,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.6)',
                                cursor: 'pointer',
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Red separator */}
                    <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.2), transparent)', marginBottom: 24 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                        {/* Avatar */}
                        <div>
                            <label style={labelStyle}>Avatar</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img
                                        src={
                                            avatarFile
                                                ? URL.createObjectURL(avatarFile)
                                                : user?.avatar ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=1e293b&color=fff`
                                        }
                                        alt="avatar"
                                        style={{
                                            width: 72, height: 72,
                                            borderRadius: 16,
                                            objectFit: 'cover',
                                            border: '2px solid rgba(232,0,61,0.5)',
                                            boxShadow: '0 0 16px rgba(232,0,61,0.25)',
                                        }}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 8,
                                            padding: '9px 18px',
                                            background: 'linear-gradient(135deg, rgba(232,0,61,0.18), rgba(232,0,61,0.08))',
                                            border: '1px solid rgba(232,0,61,0.4)',
                                            borderRadius: 10,
                                            color: '#fff', fontSize: 11,
                                            fontFamily: F, fontWeight: 700,
                                            letterSpacing: '0.06em',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Camera size={13} />
                                        Choose Image
                                    </button>
                                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
                                        JPG, PNG, GIF up to 5MB
                                    </p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => { if (e.target.files[0]) setAvatarFile(e.target.files[0]); }}
                                />
                            </div>
                        </div>

                        {/* Display Name */}
                        <div>
                            <label style={labelStyle}>Display Name</label>
                            <input
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                style={inputStyle}
                                placeholder="Your display name"
                                onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.6)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label style={labelStyle}>Bio</label>
                            <textarea
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                                placeholder="Tell us about yourself..."
                                onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.6)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                            />
                        </div>

                        {/* Favourite Games */}
                        <div>
                            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 7 }}>
                                <Gamepad2 size={11} color="rgba(255,255,255,0.45)" />
                                Favourite Games
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {GAMES.map((game) => {
                                    const sel = selectedGames.includes(game);
                                    return (
                                        <button
                                            key={game}
                                            type="button"
                                            onClick={() => toggleGame(game)}
                                            style={{
                                                padding: '7px 16px',
                                                borderRadius: 999,
                                                border: `1px solid ${sel ? '#e8003d' : 'rgba(255,255,255,0.15)'}`,
                                                background: sel ? 'rgba(232,0,61,0.18)' : 'rgba(255,255,255,0.04)',
                                                color: sel ? '#e8003d' : 'rgba(255,255,255,0.55)',
                                                fontSize: 11, fontFamily: F, fontWeight: sel ? 700 : 400,
                                                cursor: 'pointer',
                                                transition: 'all 0.18s ease',
                                                letterSpacing: '0.04em',
                                                boxShadow: sel ? '0 0 10px rgba(232,0,61,0.2)' : 'none',
                                            }}
                                        >
                                            {game}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '10px 22px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: F,
                                    cursor: 'pointer', letterSpacing: '0.06em',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    const formData = new FormData();
                                    formData.append("displayName", displayName);
                                    formData.append("bio", bio);
                                    formData.append("favoriteGames", JSON.stringify(selectedGames));
                                    if (avatarFile) formData.append("avatar", avatarFile);
                                    updateProfileMutation.mutate(formData, { onSuccess: () => { onClose(); } });
                                }}
                                disabled={updateProfileMutation.isPending}
                                style={{
                                    padding: '10px 28px', borderRadius: 12,
                                    background: updateProfileMutation.isPending ? 'rgba(232,0,61,0.4)' : 'linear-gradient(135deg, #e8003d, #b5002e)',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    color: '#fff', fontSize: 11, fontFamily: F,
                                    cursor: updateProfileMutation.isPending ? 'not-allowed' : 'pointer',
                                    fontWeight: 700, letterSpacing: '0.08em',
                                    boxShadow: '0 0 20px rgba(232,0,61,0.3)',
                                    opacity: updateProfileMutation.isPending ? 0.7 : 1,
                                }}
                            >
                                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}