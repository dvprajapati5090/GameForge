import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
    CheckCircle2,
    ShieldCheck,
    User,
    Mail,
    Trophy,
    Inbox
} from "lucide-react";

import Button from "../ui/Button";
import GlowCard from "../ui/GlowCard";

import useRegister from "../../hooks/useRegister";

import { useNavigate } from "react-router-dom";

import { completeGoogleProfile } from "../../services/google.service";

import useAuthStore from "../../store/authStore";

export default function StepReview({

    form,

    riotProfile,

    googleData,

    back

}) {

    const setUser = useAuthStore((s) => s.setUser);
    const setAccessToken = useAuthStore((s) => s.setAccessToken);

    const navigate = useNavigate();

    const register = useRegister();

    const [loading, setLoading] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [countdown, setCountdown] = useState(7);

    async function handleRegister() {

        try {

            setLoading(true);

            if (googleData) {

                const response = await completeGoogleProfile({

                    googleId: googleData.googleId,

                    email: googleData.email,

                    displayName: form.displayName,

                    avatar: googleData.avatar,

                    username: form.username,

                    role: form.role,

                    gameName: form.riotGameName,

                    tagLine: form.riotTagLine,

                    region: form.region

                });

                setUser(response.data.user);

                setAccessToken(response.data.accessToken);

                const destination = form.role === "HOST" ? "/host" : "/dashboard";
                navigate(destination);

            } else {

                await register.mutateAsync({

                    username: form.username,

                    displayName: form.displayName,

                    email: form.email,

                    password: form.password,

                    role: form.role,

                    // Security question — always included
                    securityQuestion: form.securityQuestion,

                    securityAnswer: form.securityAnswer,

                    ...(form.role === "PLAYER" && {

                        gameName: form.riotGameName,

                        tagLine: form.riotTagLine,

                        region: form.region

                    })

                });

                // LOCAL: show email verification overlay, then redirect to login
                setShowVerification(true);
                let remaining = 7;
                const interval = setInterval(() => {
                    remaining -= 1;
                    setCountdown(remaining);
                    if (remaining <= 0) {
                        clearInterval(interval);
                        navigate('/login', { state: { success: 'Account created! Please verify your email before logging in.' } });
                    }
                }, 1000);

            }

        }

        catch (error) {

            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    }

    return (
        <>
        {/* ─── Email Verification Sent Overlay ─── */}
        <AnimatePresence>
            {showVerification && (
                <motion.div
                    key="email-verify-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.92)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        fontFamily: '"Space Mono", monospace',
                    }}
                >
                    {/* Animated background glow */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(232,0,61,0.12) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <motion.div
                        initial={{ scale: 0.85, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                        style={{
                            position: 'relative',
                            width: '100%', maxWidth: 480,
                            margin: '0 16px',
                            background: 'rgba(8,2,14,0.97)',
                            border: '1px solid rgba(232,0,61,0.25)',
                            borderTop: '3px solid #e8003d',
                            borderRadius: 24,
                            padding: 48,
                            textAlign: 'center',
                            boxShadow: '0 0 80px rgba(232,0,61,0.15), 0 32px 80px rgba(0,0,0,0.8)',
                        }}
                    >
                        {/* Mail icon with pulse ring */}
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute', inset: -12, borderRadius: '50%',
                                    border: '2px solid rgba(232,0,61,0.25)',
                                    pointerEvents: 'none',
                                }}
                            />
                            <motion.div
                                animate={{ scale: [1, 1.08, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                                style={{
                                    position: 'absolute', inset: -24, borderRadius: '50%',
                                    border: '1px solid rgba(232,0,61,0.1)',
                                    pointerEvents: 'none',
                                }}
                            />
                            <div style={{
                                width: 80, height: 80, borderRadius: '50%',
                                background: 'rgba(232,0,61,0.12)',
                                border: '1px solid rgba(232,0,61,0.4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 32px rgba(232,0,61,0.3)',
                            }}>
                                <Inbox size={36} color="#e8003d" />
                            </div>
                        </div>

                        <p style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 14 }}>
                            // EMAIL VERIFICATION
                        </p>

                        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 12 }}>
                            Check Your Inbox!
                        </h2>

                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 32, maxWidth: 360, margin: '0 auto 32px' }}>
                            A verification link has been sent to your email address.
                            Click the link in the email to activate your account before logging in.
                        </p>

                        {/* Countdown bar */}
                        <div style={{ marginBottom: 24 }}>
                            <div style={{
                                height: 4, borderRadius: 4,
                                background: 'rgba(255,255,255,0.06)',
                                overflow: 'hidden', marginBottom: 10,
                            }}>
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${(countdown / 7) * 100}%` }}
                                    transition={{ duration: 0.9, ease: 'linear' }}
                                    style={{ height: '100%', background: 'linear-gradient(to right, #e8003d, #b5002e)', borderRadius: 4 }}
                                />
                            </div>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                                Redirecting to login in <span style={{ color: '#e8003d', fontWeight: 700 }}>{countdown}s</span>...
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/login', { state: { success: 'Account created! Please verify your email before logging in.' } })}
                            style={{
                                padding: '12px 32px', borderRadius: 12,
                                background: 'linear-gradient(135deg, #e8003d, #b5002e)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#fff', fontSize: 12, fontFamily: '"Space Mono", monospace',
                                fontWeight: 700, letterSpacing: '0.08em',
                                cursor: 'pointer',
                                boxShadow: '0 0 20px rgba(232,0,61,0.3)',
                            }}
                        >
                            Go to Login Now
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.35 }}

            className="flex flex-col gap-10"

        >

            {/* Hero */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/5
                    p-10
                    backdrop-blur-xl
                    text-center
                "
            >

                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white blur-3xl" />

                <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-black blur-3xl" />

                <div className="relative">

                    <div
                        className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-green-500/30
                            bg-green-500/10
                            text-green-400
                            shadow-lg
                            shadow-green-500/20
                        "
                    >

                        <CheckCircle2 size={38} />

                    </div>

                    <h2 className="mt-4 text-2xl font-black text-white">

                        Ready to Join GameForge

                    </h2>

                    <p className="mx-auto mt-2 text-xs max-w-2xl text-gray-400">

                        Everything looks perfect.
                        Review your information one last time before
                        creating your account.

                    </p>

                </div>

            </div>

            {/* Review Card */}

            <GlowCard

                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/5
                    p-8
                    backdrop-blur-xl
                "

            >

                <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-white blur-3xl" />

                <div className="relative flex flex-col gap-7">

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white/20
                                bg-black
                                text-white
                            "
                        >

                            <ShieldCheck size={26} />

                        </div>

                        <div>

                            <h3 className="text-xl font-bold font-mono text-white">

                                Account Summary

                            </h3>

                            <p className="mt-1 text-xs text-gray-400">

                                Please verify all your information.

                            </p>

                        </div>

                    </div>

                    <ReviewRow

                        icon={<User size={18}/>}

                        label="Username"

                        value={form.username}

                    />

                    <ReviewRow

                        icon={<User size={18}/>}

                        label="Display Name"

                        value={form.displayName}

                    />

                    <ReviewRow

                        icon={<Mail size={18}/>}

                        label="Email"

                        value={form.email}

                    />

                    <ReviewRow

                        icon={<Trophy size={18}/>}

                        label="Role"

                        value={form.role}

                    />

                    {

                        form.role === "PLAYER" && riotProfile && (

                            <>
                                                            <ReviewRow

                                    icon={<ShieldCheck size={18}/>}

                                    label="Riot ID"

                                    value={`${riotProfile.gameName}#${riotProfile.tagLine}`}

                                />

                                <ReviewRow

                                    icon={<Trophy size={18}/>}

                                    label="Current Rank"

                                    value={riotProfile.currentRank}

                                />

                                <ReviewRow

                                    icon={<Trophy size={18}/>}

                                    label="Highest Rank"

                                    value={riotProfile.highestRank}

                                />

                                <ReviewRow

                                    icon={<ShieldCheck size={18}/>}

                                    label="Account Level"

                                    value={riotProfile.level}

                                />

                            </>

                        )

                    }

                </div>

            </GlowCard>

            {/* Bottom Navigation */}

            <div className="flex items-center justify-between pt-2">

                <Button

                    variant="secondary"

                    onClick={back}

                    className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        px-8
                        py-3
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-white/20
                        hover:bg-black
                    "

                >

                    ← Back

                </Button>

                <Button

                    loading={loading || register.isPending}

                    onClick={handleRegister}

                    className="
                        min-w-[180px]
                    "

                >

                    Create Account

                </Button>

            </div>

        </motion.div>
        </>
    );

}
function ReviewRow({

    icon,

    label,

    value

}) {

    return (

        <motion.div

            initial={{ opacity: 0, y: 8 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.25 }}

            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-white/20
                hover:bg-white/10
            "

        >

            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-white
                    blur-3xl
                    transition-all
                    duration-300
                    group-hover:bg-white
                "
            />

            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/20
                            bg-black
                            text-white
                        "
                    >

                        {icon}

                    </div>

                    <div>

                        <p
                            className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-widest
                                text-gray-400
                            "
                        >

                            {label}

                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                font-semibold
                                text-white
                                break-all
                            "
                        >

                            {value}

                        </p>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}