import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Shield,
    Trophy
} from "lucide-react";

import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import Button from "../ui/Button";

import useCheckUsername from "../../hooks/useCheckUsername";
import useCheckEmail from "../../hooks/useCheckEmail";

export default function StepBasicInfo({

    form,

    setForm,

    next,

    googleMode

}) {

    const username = useCheckUsername(form.username);

    const email = useCheckEmail(form.email);

    const passwordStrength = getPasswordStrength(form.password);

    const passwordsMatch =
        form.confirmPassword.length > 0 &&
        form.password === form.confirmPassword;

    const canContinue =
        form.username.length >= 3 &&
        form.displayName.length >= 3 &&
        form.email.length > 5 &&
        username.data?.data?.available &&
        (
            googleMode ||
            email.data?.data?.available
        ) &&
        (
            googleMode ||
            (
                form.password.length >= 8 &&
                passwordsMatch
            )
        );

    function update(field, value) {

        setForm((prev) => ({

            ...prev,

            [field]: value

        }));

    }

    return (

        <GlassCard className="relative overflow-hidden p-8 md:p-10">

            {/* Glow */}
            <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-black blur-3xl" />

            <div className="relative z-10 flex flex-col gap-10">

                {/* Header */}

                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/20
                                bg-black
                                text-white
                                shadow-lg
                                shadow-white/10
                            "
                        >
                            <Shield size={20} />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold font-mono text-white">

                                Basic Information

                            </h2>

                            <p className="mt-1 text-xs text-gray-400">

                                Create your GameForge account to begin your
                                competitive journey.

                            </p>

                        </div>

                    </div>

                </motion.div>

                {/* Account Type */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >

                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-wider text-gray-400">

                        Account Type

                    </label>

                    <div className="grid grid-cols-2 gap-5">

                        <motion.button
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() =>
                                update("role", "PLAYER")
                            }
                            className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                                form.role === "PLAYER"
                                    ? "border-[#0a9396] bg-black shadow-lg shadow-[#0a9396]/20"
                                    : "border-white/20 bg-white/10 hover:border-[#0a9396]/50 hover:bg-white/20"
                            }`}
                        >

                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">

                                <User size={20} />

                            </div>

                            <h3 className="text-sm font-bold text-white">

                                Player

                            </h3>

                            <p className="mt-1.5 text-xs leading-5 text-gray-400">

                                Join tournaments, build teams, improve rankings
                                and compete against players worldwide.

                            </p>

                        </motion.button>

                        <motion.button
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() =>
                                update("role", "HOST")
                            }
                            className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                                form.role === "HOST"
                                    ? "border-[#0a9396] bg-black shadow-lg shadow-[#0a9396]/20"
                                    : "border-white/20 bg-white/10 hover:border-[#0a9396]/50 hover:bg-white/20"
                            }`}
                        >

                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">

                                <Trophy size={20} />

                            </div>

                            <h3 className="text-sm font-bold text-white">

                                Tournament Host

                            </h3>

                            <p className="mt-1.5 text-xs leading-5 text-gray-400">

                                Organize tournaments, manage participants,
                                create brackets and host professional events.

                            </p>

                        </motion.button>

                    </div>

                </motion.div>

                {/* Username */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-4"
                >

                    <FieldTitle

                        icon={<User size={16} />}

                        title="Username"

                        subtitle="Choose a unique GameForge username."

                    />

                    <Input

                        placeholder="Username"

                        value={form.username}

                        onChange={(e) =>

                            update("username", e.target.value)

                        }

                        loading={username.isLoading}

                        success={

                            username.data?.data?.available

                                ? "Username available"

                                : ""

                        }

                        error={

                            username.data &&

                            !username.data.data.available

                                ? "Username already taken"

                                : ""

                        }

                    />

                </motion.div>

                {/* Display Name */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-col gap-4"
                >

                    <FieldTitle

                        icon={<User size={16} />}

                        title="Display Name"

                        subtitle="This name will be visible across GameForge."

                    />

                    <Input

                        placeholder="Display Name"

                        value={form.displayName}

                        onChange={(e) =>

                            update("displayName", e.target.value)

                        }

                    />
                    </motion.div>
                                    {/* Email */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4"
                >

                    <FieldTitle

                        icon={<Mail size={16} />}

                        title="Email Address"

                        subtitle="We'll use this email for verification and important account updates."

                    />

                    <Input

                        placeholder="Email"

                        type="email"

                        value={form.email}

                        disabled={googleMode}

                        onChange={(e) =>

                            update("email", e.target.value)

                        }

                        loading={email.isLoading}

                        success={

                            email.data?.data?.available

                                ? "Email available"

                                : ""

                        }

                        error={

                            email.data &&

                            !email.data.data.available

                                ? "Email already exists"

                                : ""

                        }

                    />

                </motion.div>

                {
                    !googleMode && (

                        <>
                            {/* Password */}

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="flex flex-col gap-4"
                                >

                                    <FieldTitle

                                        icon={<Lock size={16} />}

                                        title="Password"

                                        subtitle="Create a secure password with at least 8 characters."

                                    />

                                    <Input

                                        placeholder="Password"

                                        type="password"

                                        value={form.password}

                                        onChange={(e) =>

                                            update("password", e.target.value)

                                        }

                                    />

                                    <PasswordStrength

                                        strength={passwordStrength}

                                    />

                                </motion.div>

                                {/* Confirm Password */}

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col gap-4"
                                >

                                    <FieldTitle

                                        icon={<Lock size={16} />}

                                        title="Confirm Password"

                                        subtitle="Re-enter your password to make sure everything matches."

                                    />

                                    <Input

                                        placeholder="Confirm Password"

                                        type="password"

                                        value={form.confirmPassword}

                                        onChange={(e) =>

                                            update(

                                                "confirmPassword",

                                                e.target.value

                                            )

                                        }

                                        success={

                                            passwordsMatch

                                                ? "Passwords match"

                                                : ""

                                        }

                                        error={

                                            form.confirmPassword.length > 0 &&

                                            !passwordsMatch

                                                ? "Passwords do not match"

                                                : ""

                                        }

                                    />

                                </motion.div>

                                {/* Continue */}
                        </>
                    )
                }

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex justify-end pt-4"
                >

                    <Button

                        onClick={next}

                        disabled={!canContinue}

                        className="
                            min-w-[180px]
                        "

                    >

                        Continue →

                    </Button>

                </motion.div>

            </div>

        </GlassCard>

    );

}
function FieldTitle({

    icon,

    title,

    subtitle

}) {

    return (

        <div className="flex flex-col gap-2">

            <div className="flex items-center gap-4">

                <div
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/30
                        bg-black/50
                        text-white
                        shadow-md
                        shadow-white/5
                    "
                >

                    {icon}

                </div>

                <div>

                    <h3 className="text-sm font-bold text-white">

                        {title}

                    </h3>

                    <p className="mt-0.5 text-xs text-gray-400">

                        {subtitle}

                    </p>

                </div>

            </div>

        </div>

    );

}

function PasswordStrength({

    strength

}) {

    const colors = {

        Weak: "from-[#9b2226] to-[#ae2012]",

        Medium: "from-[#ca6702] to-[#ee9b00]",

        Strong: "from-[#005f73] to-[#0a9396]"

    };

    const widths = {

        Weak: "w-1/3",

        Medium: "w-2/3",

        Strong: "w-full"

    };

    const textColors = {

        Weak: "text-[#ae2012]",

        Medium: "text-[#ee9b00]",

        Strong: "text-[#0a9396]"

    };

    return (

        <div className="flex flex-col gap-3">

            <div
                className="
                    h-2.5
                    overflow-hidden
                    rounded-full
                    bg-white/10
                    backdrop-blur-sm
                "
            >

                <div
                    className={`
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        ${colors[strength]}
                        ${widths[strength]}
                        transition-all
                        duration-500
                    `}
                />

            </div>

            <div className="flex items-center justify-between">

                <span className="text-sm text-gray-400">

                    Password Strength

                </span>

                <span
                    className={`
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        ${textColors[strength]}
                    `}
                >

                    {strength}

                </span>

            </div>

        </div>

    );

}

function getPasswordStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";

    if (score === 3) return "Medium";

    return "Strong";

}