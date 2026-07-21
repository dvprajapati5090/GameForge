import { User, Mail, Lock } from "lucide-react";

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

        <GlassCard className="p-8">

            <div>
                
                <label className="font-semibold">
                    Account Type
                </label>

                <div className="grid grid-cols-2 gap-4 mt-3">

                    <button
                        type="button"
                        onClick={() =>
                            update("role", "PLAYER")
                        }
                        className={
                            form.role === "PLAYER"
                                ? "rounded-xl border border-cyan-500 bg-cyan-500/20 p-4"
                                : "rounded-xl border border-white/10 p-4"
                        }
                    >
                        🎮 Player
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            update("role", "HOST")
                        }
                        className={
                            form.role === "HOST"
                                ? "rounded-xl border border-purple-500 bg-purple-500/20 p-4"
                                : "rounded-xl border border-white/10 p-4"
                        }
                    >
                        🏆 Host
                    </button>

                </div>

            </div>

            <div className="space-y-8">

                <FieldTitle

                    icon={<User size={20} />}

                    title="Username"

                    subtitle="Choose a unique GameForge username"

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

                <FieldTitle

                    icon={<User size={20} />}

                    title="Display Name"

                    subtitle="This is what players will see"

                />

                <Input

                    placeholder="Display Name"

                    value={form.displayName}

                    onChange={(e) =>

                        update("displayName", e.target.value)

                    }

                />

                <FieldTitle

                    icon={<Mail size={20} />}

                    title="Email"

                    subtitle="We'll never share your email"

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

                <FieldTitle

                    icon={<Lock size={20} />}

                    title="Password"

                    subtitle="Minimum 8 characters"

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

                <div className="flex justify-end">

                    <Button

                        onClick={next}

                        disabled={!canContinue}

                    >

                        Continue →

                    </Button>

                </div>

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

        <div>

            <div className="flex items-center gap-3">

                <div className="text-cyan-400">

                    {icon}

                </div>

                <h3 className="font-bold text-lg">

                    {title}

                </h3>

            </div>

            <p className="text-gray-400 mt-1 ml-8">

                {subtitle}

            </p>

        </div>

    );

}

function PasswordStrength({

    strength

}) {

    const colors = {

        Weak: "bg-red-500",

        Medium: "bg-yellow-500",

        Strong: "bg-green-500"

    };

    const widths = {

        Weak: "w-1/3",

        Medium: "w-2/3",

        Strong: "w-full"

    };

    return (

        <div>

            <div
                className="
                    h-2
                    rounded-full
                    bg-white/10
                    overflow-hidden
                "
            >

                <div

                    className={`
                        h-full
                        ${colors[strength]}
                        ${widths[strength]}
                        transition-all
                    `}

                />

            </div>

            <p className="text-sm text-gray-400 mt-2">

                Password Strength :

                <span className="ml-2 font-bold">

                    {strength}

                </span>

            </p>

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