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

    next

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

        form.password.length >= 8 &&

        passwordsMatch &&

        username.data?.data?.available &&

        email.data?.data?.available;

    function update(field, value) {

        setForm((prev) => ({

            ...prev,

            [field]: value

        }));

    }

    return (

        <GlassCard className="relative overflow-hidden p-8 md:p-10">

            {/* Glow */}
            <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative z-10 space-y-10">

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
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-violet-500/30
                                bg-violet-500/10
                                text-violet-300
                                shadow-lg
                                shadow-violet-500/20
                            "
                        >
                            <Shield size={26} />
                        </div>

                        <div>

                            <h2 className="text-3xl font-bold text-white">

                                Basic Information

                            </h2>

                            <p className="mt-1 text-sm text-gray-400">

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

                    <label className="mb-4 block text-sm font-semibold uppercase tracking-wider text-gray-300">

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
                                    ? "border-violet-500/60 bg-violet-500/15 shadow-lg shadow-violet-500/20"
                                    : "border-white/10 bg-white/5 hover:border-violet-500/30 hover:bg-white/10"
                            }`}
                        >

                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">

                                <User size={24} />

                            </div>

                            <h3 className="text-lg font-semibold text-white">

                                Player

                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-400">

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
                                    ? "border-violet-500/60 bg-violet-500/15 shadow-lg shadow-violet-500/20"
                                    : "border-white/10 bg-white/5 hover:border-violet-500/30 hover:bg-white/10"
                            }`}
                        >

                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">

                                <Trophy size={24} />

                            </div>

                            <h3 className="text-lg font-semibold text-white">

                                Tournament Host

                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-400">

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
                    className="space-y-4"
                >

                    <FieldTitle

                        icon={<User size={20} />}

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
                    className="space-y-4"
                >

                    <FieldTitle

                        icon={<User size={20} />}

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
                    className="space-y-4"
                >

                    <FieldTitle

                        icon={<Mail size={20} />}

                        title="Email Address"

                        subtitle="We'll use this email for verification and important account updates."

                    />

                    <Input

                        placeholder="Email"

                        type="email"

                        value={form.email}

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

                {/* Password */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-4"
                >

                    <FieldTitle

                        icon={<Lock size={20} />}

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
                    className="space-y-4"
                >

                    <FieldTitle

                        icon={<Lock size={20} />}

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
                            rounded-xl
                            bg-gradient-to-r
                            from-violet-600
                            to-fuchsia-600
                            px-8
                            py-3
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-violet-600/30
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                            hover:shadow-violet-500/50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
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

        <div className="space-y-2">

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
                        border-violet-500/30
                        bg-violet-500/10
                        text-violet-300
                        shadow-md
                        shadow-violet-500/20
                    "
                >

                    {icon}

                </div>

                <div>

                    <h3 className="text-lg font-semibold text-white">

                        {title}

                    </h3>

                    <p className="mt-1 text-sm text-gray-400">

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

        Weak: "from-red-500 to-red-400",

        Medium: "from-amber-500 to-yellow-400",

        Strong: "from-emerald-500 to-green-400"

    };

    const widths = {

        Weak: "w-1/3",

        Medium: "w-2/3",

        Strong: "w-full"

    };

    const textColors = {

        Weak: "text-red-400",

        Medium: "text-yellow-400",

        Strong: "text-green-400"

    };

    return (

        <div className="space-y-3">

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