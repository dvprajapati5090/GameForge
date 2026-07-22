import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import { loginSchema } from "../../validators/auth.validator";
import useLogin from "../../hooks/useLogin";

function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state.success);
    }
  }, [location]);

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        toast.error(error.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 70,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group

        relative
        overflow-hidden

        w-full
        max-w-[450px]

        rounded-2xl

        border
        border-white/10

        bg-[#10151F]/92

        backdrop-blur-2xl

        shadow-[0_22px_60px_rgba(0,0,0,.45)]

        transition-all
        duration-500

        hover:border-violet-500/35

        hover:shadow-[0_35px_90px_rgba(139,92,246,.18)]

        px-8
        py-7

        max-h-[90vh]
      "
    >
      {/* Decorative Lines */}

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
        absolute

        -right-24
        -top-24

        h-60
        w-60

        rounded-full

        bg-violet-500/10

        blur-[130px]

        opacity-70

        transition-all
        duration-700

        group-hover:scale-125
        group-hover:opacity-100
    "
        />

        <div
          className="
        absolute

        -left-20
        bottom-0

        h-56
        w-56

        rounded-full

        bg-violet-500/8

        blur-[130px]

        opacity-50

        transition-all
        duration-700

        group-hover:scale-125
        group-hover:opacity-90
    "
        />
      </div>

      {/* Header */}

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.45rem]
                text-slate-500
              "
            >
              Esports Platform
            </p>

            <h1
              className="
                mt-3

                text-5xl

                font-black

                tracking-tight

                text-white
              "
            >
              Game
              <span className="text-violet-400">Forge</span>
            </h1>
          </div>

          <div
            className="
              flex
              items-center
              gap-2

              rounded-full

              border
              border-emerald-500/30

              bg-emerald-500/10

              px-4
              py-2

              text-[11px]

              font-semibold

              uppercase

              tracking-[0.2rem]

              text-emerald-300
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <h2
          className="
            text-xl
            font-semibold
            tracking-wide
            text-white
          "
        >
          PLAYER LOGIN
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-7
            text-slate-400
          "
        >
          Sign in to manage your tournaments, teams, match history, rankings and
          competitive profile.
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 mt-7 space-y-5"
      >
        {/* EMAIL */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label
            className="
              mb-3
              flex
              items-center
              gap-2

              text-sm
              font-semibold
              tracking-wide

              text-slate-300
            "
          >
            <FaEnvelope className="text-violet-400" />
            EMAIL ADDRESS
          </label>

          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="
                w-full

                rounded-2xl

                border
                border-slate-700/70

                bg-[#0D1424]

                px-5
                py-3

                text-white

                placeholder:text-slate-500

                outline-none

                transition-all
                duration-300

                focus:border-violet-500
                focus:ring-4
                focus:ring-violet-500/10

                hover:border-violet-400/40
              "
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
          )}
        </motion.div>

        {/* PASSWORD */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label
            className="
              mb-3
              flex
              items-center
              gap-2

              text-sm
              font-semibold
              tracking-wide

              text-slate-300
            "
          >
            <FaLock className="text-violet-400" />
            PASSWORD
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="
                w-full

                rounded-2xl

                border
                border-slate-700/70

                bg-[#0D1424]

                px-5
                py-3
                pr-14

                text-white

                placeholder:text-slate-500

                outline-none

                transition-all
                duration-300

                focus:border-violet-500
                focus:ring-4
                focus:ring-violet-500/10

                hover:border-violet-400/40
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2

                text-slate-400

                hover:text-violet-400

                transition
              "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </motion.div>

        {/* Remember */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-between"
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="
                h-4
                w-4
                accent-violet-500
              "
            />

            <span className="text-sm text-slate-400">Remember Me</span>
          </label>

          <button
            type="button"
            className="
              text-sm

              text-violet-400

              transition

              hover:text-violet-300
            "
          >
            Forgot Password?
          </button>
        </motion.div>

        {/* LOGIN BUTTON */}

        <motion.button
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="submit"
          disabled={loginMutation.isPending}
          className="
            group

            relative

            flex
            items-center
            justify-center
            gap-4

            w-full

            overflow-hidden

            rounded-2xl

            bg-violet-600

            py-3.5

            text-lg
            font-bold
            tracking-wider

            text-white

            transition-all
            duration-300

            hover:bg-violet-500

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <div
            className="
              absolute

              inset-0

              -translate-x-full

              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent

              transition-all
              duration-700

              group-hover:translate-x-full
            "
          />

          <span className="relative">
            {loginMutation.isPending ? "ENTERING..." : "ENTER ARENA"}
          </span>

          {!loginMutation.isPending && (
            <FaArrowRight
              className="
                relative

                transition-transform

                duration-300

                group-hover:translate-x-2
              "
            />
          )}
        </motion.button>
        {/* REGISTER */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="
            pt-5
            mt-2

            border-t
            border-white/10
          "
        >
          <div className="flex items-center gap-15">
            <div className="flex flex-col">
              <p
                className="
      text-sm
      text-slate-400
    "
              >
                Don't have an account?
              </p>
            </div>

            <Link
              to="/register"
              className="
                group

                inline-flex
                items-center
                gap-2

                rounded-lg

                border
                border-violet-500/25

                bg-violet-500/10

                px-5
                py-2.5

                text-xs
                font-semibold

                uppercase
                tracking-[0.18rem]

                text-violet-300

                transition-all
                duration-300

                hover:bg-violet-500/20
                hover:border-violet-400
                hover:text-white
                "
            >
              CREATE ONE
              <FaArrowRight
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </motion.div>
      </form>

      {/* Bottom Accent */}

      <div
        className="
          absolute

          bottom-0
          left-0

          h-[2px]
          w-full

          bg-gradient-to-r
          from-transparent
          via-violet-500/60
          to-transparent
        "
      />

      {/* Corner Decorations */}

      <div
        className="
          absolute

          left-6
          top-6

          h-8
          w-8

          border-l
          border-t

          border-violet-500/20
        "
      />

      <div
        className="
          absolute

          right-6
          bottom-6

          h-8
          w-8

          border-r
          border-b

          border-violet-500/20
        "
      />
    </motion.div>
  );
}

export default LoginCard;
