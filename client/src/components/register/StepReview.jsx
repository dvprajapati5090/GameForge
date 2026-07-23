import { useState } from "react";
import { motion } from "framer-motion";

import {
    CheckCircle2,
    ShieldCheck,
    User,
    Mail,
    Trophy
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

            } else {

                await register.mutateAsync({

                    username: form.username,

                    displayName: form.displayName,

                    email: form.email,

                    password: form.password,

                    role: form.role,

                    ...(form.role === "PLAYER" && {

                        riotGameName: form.riotGameName,

                        riotTagLine: form.riotTagLine,

                        region: form.region

                    })

                });

            }

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.35 }}

            className="space-y-10"

        >

            {/* Hero */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-white/5
                    p-10
                    backdrop-blur-xl
                    text-center
                "
            >

                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />

                <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-fuchsia-600/10 blur-3xl" />

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

                    <h2 className="mt-6 text-4xl font-black text-white">

                        Ready to Join GameForge

                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-400">

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
                    border-violet-500/20
                    bg-white/5
                    p-8
                    backdrop-blur-xl
                "

            >

                <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />

                <div className="relative space-y-7">

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
                                border-violet-500/30
                                bg-violet-500/10
                                text-violet-300
                            "
                        >

                            <ShieldCheck size={26} />

                        </div>

                        <div>

                            <h3 className="text-2xl font-bold text-white">

                                Account Summary

                            </h3>

                            <p className="mt-1 text-gray-400">

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
                        hover:border-violet-500/30
                        hover:bg-violet-500/10
                    "

                >

                    ← Back

                </Button>

                <Button

                    loading={loading || register.isPending}

                    onClick={handleRegister}

                    className="
                        rounded-2xl
                        bg-gradient-to-r
                        from-violet-600
                        via-purple-600
                        to-fuchsia-600
                        px-8
                        py-3
                        shadow-lg
                        shadow-violet-600/20
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-violet-500/40
                    "

                >

                    Create Account

                </Button>

            </div>

        </motion.div>

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
                hover:border-violet-500/30
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
                    bg-violet-600/10
                    blur-3xl
                    transition-all
                    duration-300
                    group-hover:bg-violet-600/20
                "
            />

            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            text-violet-300
                        "
                    >

                        {icon}

                    </div>

                    <div>

                        <p
                            className="
                                text-xs
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
                                text-lg
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