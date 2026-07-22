import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function Input({

    label,

    error,

    success,

    loading,

    className = "",

    ...props

}) {

    return (

        <div className="space-y-2">

            {

                label && (

                    <label className="font-medium text-slate-300">

                        {label}

                    </label>

                )

            }

            <div className="relative">

                <input

                    className={`
                        w-full
                        h-14

                        rounded-xl

                        border
                        border-white/10

                        bg-[#1B2230]/95

                        px-5
                        pr-12

                        text-white
                        placeholder:text-slate-500

                        outline-none

                        transition-all
                        duration-300

                        shadow-[0_10px_30px_rgba(0,0,0,0.35)]

                        hover:border-violet-500/45
                        hover:shadow-[0_18px_45px_rgba(139,92,246,.16)]

                        focus:border-violet-500
                        focus:shadow-[0_0_0_1px_rgba(139,92,246,.45),0_22px_55px_rgba(139,92,246,.22)]
                        focus:-translate-y-[3px]

                        ${className}
                    `}

                    {...props}

                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2">

                    {

                        loading && (

                            <Loader2

                                size={18}

                                className="animate-spin text-violet-400"

                            />

                        )

                    }

                    {

                        success && !loading && (

                            <CheckCircle2

                                size={18}

                                className="text-emerald-400"

                            />

                        )

                    }

                    {

                        error && !loading && (

                            <XCircle

                                size={18}

                                className="text-red-400"

                            />

                        )

                    }

                </div>

            </div>

            {

                error && (

                    <p className="text-sm text-red-400">

                        {error}

                    </p>

                )

            }

            {

                success && (

                    <p className="text-sm text-emerald-400">

                        {success}

                    </p>

                )

            }

        </div>

    );

}