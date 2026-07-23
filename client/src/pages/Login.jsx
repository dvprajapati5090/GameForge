import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "../validators/auth.validator";
import useLogin from "../hooks/useLogin";

import Background from "../components/auth/Background";
import HeroSection from "../components/auth/HeroSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const loginMutation = useLogin();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        loginMutation.mutate(data, {
            onError: (error) => {
                toast.error(
                    error.response?.data?.message ||
                    "Login failed"
                );
            }
        });
    };

    const location = useLocation();

    useEffect(() => {

        if (location.state?.success) {

            toast.success(

                location.state.success

            );

        }

    }, [location]);

    return (
        <>
            <Background />

            <div
                className="
                    relative
                    z-10
                    min-h-screen

                    flex

                    px-8
                    lg:px-20
                    xl:px-32
                "
            >

                {/* LEFT SIDE */}
                <HeroSection />

                {/* RIGHT SIDE */}
                <div
                    className="
                        flex
                        w-full
                        lg:w-[45%]

                        items-center
                        justify-center

                        px-8
                    "
                >

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 80,
                            scale: 0.95
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            y: [0, -6, 0]
                        }}
                        transition={{
                            opacity: { duration: 0.8 },
                            x: { duration: 0.8 },
                            scale: { duration: 0.8 },
                            y: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        whileHover={{
                            scale: 1.02
                        }}
                        className="
                            relative
                            overflow-hidden

                            w-full
                            max-w-md

                            rounded-3xl

                            border
                            border-white/10

                            bg-slate-950/40

                            backdrop-blur-2xl

                            shadow-[0_0_120px_rgba(59,130,246,0.18)]

                            p-10
                        "
                    >
                        <div
                            className="
                                absolute
                                left-1/2
                                top-10
                                -translate-x-1/2

                                w-52
                                h-24

                                bg-cyan-500/20
                                blur-3xl

                                rounded-full
                                pointer-events-none
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-0

                                rounded-3xl

                                p-[1px]

                                bg-gradient-to-r
                                from-cyan-400/30
                                via-purple-500/30
                                to-pink-500/30

                                animate-pulse
                                pointer-events-none
                            "
                        />

                        {/* Heading */}

                        <div className="text-center mb-8">

                            <motion.h1
                                initial={{
                                    opacity:0,
                                    y:-20
                                }}
                                animate={{
                                    opacity:1,
                                    y:0
                                }}
                                transition={{
                                    delay:0.3,
                                    duration:0.6
                                }}
                                className="
                                    text-5xl
                                    font-extrabold
                                    bg-gradient-to-r
                                    from-purple-400
                                    via-blue-400
                                    to-cyan-300
                                    text-transparent
                                    bg-clip-text
                                "
                            >
                                GameForge
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    duration: 0.8
                                }}
                                className="mt-3 text-gray-300"
                            >
                                Welcome back Player 🎮
                            </motion.p>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* EMAIL */}

                            <motion.div
                            initial={{opacity:0,x:30}}
                            animate={{opacity:1,x:0}}
                            transition={{delay:0.45}}
                            >

                                <label className="text-white/90 font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    {...register("email")}
                                    className="
                                        w-full
                                        rounded-2xl
                                        bg-slate-900/70
                                        border
                                        border-slate-700
                                        py-4 px-5
                                        pr-14
                                        text-white
                                        placeholder:text-slate-500
                                        outline-none
                                        transition
                                        focus:border-cyan-400
                                        focus:ring-4
                                        focus:ring-cyan-400/20

                                        hover:shadow-lg
                                        hover:shadow-cyan-500/10

                                        duration-300
                                    "
                                />

                                {
                                    errors.email &&
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                }

                            </motion.div>

                            {/* PASSWORD */}

                            <motion.div
                            initial={{opacity:0,x:30}}
                            animate={{opacity:1,x:0}}
                            transition={{delay:0.5}}
                            >

                                <label className="text-white/90 font-medium">
                                    Password
                                </label>

                                <div className="relative mt-2">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        {...register("password")}
                                        className="
                                            w-full
                                            rounded-2xl
                                            bg-slate-900/70
                                            border
                                            border-slate-700
                                            py-4 px-5
                                            pr-14
                                            text-white
                                            placeholder:text-slate-500
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-4
                                            focus:ring-cyan-400/20
                                            
                                            hover:shadow-lg
                                            hover:shadow-cyan-500/10

                                            duration-300
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2

                                        text-gray-400

                                        hover:text-cyan-400
                                        hover:rotate-12

                                        transition-all
                                        duration-300

                                        cursor-pointer
                                        "
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}

                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.75 }}
                                className="flex items-center justify-between text-sm"
                            >

                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="
                                            accent-purple-600
                                            w-4
                                            h-4
                                        "
                                    />

                                    <span className="text-gray-300">
                                        Remember Me
                                    </span>

                                </label>

                                <button
                                    type="button"
                                    className="
                                        text-cyan-400
                                        hover:text-cyan-300
                                        transition
                                    "
                                >
                                    Forgot Password?
                                </button>

                            </motion.div>

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="
                                group
                                relative
                                overflow-hidden

                                w-full

                                rounded-xl

                                py-4

                                font-bold
                                text-lg

                                bg-gradient-to-r
                                from-purple-600
                                via-blue-600
                                to-cyan-500

                                text-white

                                shadow-xl

                                transition-all
                                duration-300

                                hover:scale-[1.02]
                                hover:shadow-cyan-400/70

                                active:scale-95

                                disabled:opacity-60
                                disabled:cursor-not-allowed
                                "
                            >

                                <span
                                className="
                                absolute
                                top-0
                                -left-full

                                h-full
                                w-1/2

                                bg-white/20
                                skew-x-12

                                transition-all
                                duration-700

                                group-hover:left-[150%]
                                "
                                />

                                <span className="relative z-10">

                                {loginMutation.isPending ? (
                                    <div className="flex items-center justify-center gap-3">

                                        <div
                                            className="
                                                w-5
                                                h-5
                                                border-2
                                                border-white/40
                                                border-t-white
                                                rounded-full
                                                animate-spin
                                            "
                                        />

                                        Logging In...

                                    </div>
                                ) : (
                                    "Login"
                                )}

                                </span>

                            </button>

                            <div className="mt-6">

                                <div className="flex items-center gap-4 mb-6">

                                    <div className="flex-1 h-px bg-white/10" />

                                    <span className="text-gray-400 text-sm">

                                        OR

                                    </span>

                                    <div className="flex-1 h-px bg-white/10" />

                                </div>

                                <GoogleLoginButton />

                            </div>

                            <p className="text-center text-gray-400 mt-6">

                                Don't have an account?{" "}

                                <Link

                                    to="/register"

                                    className="
                                        text-cyan-400
                                        hover:text-cyan-300
                                        font-semibold
                                    "

                                >

                                    Register

                                </Link>

                            </p>

                        </form>

                    </motion.div>

                </div>

            </div>

        </>
    );

}