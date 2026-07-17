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

                    <label className="font-semibold text-gray-300">

                        {label}

                    </label>

                )

            }

            <div className="relative">

                <input

                    className={`
                        w-full
                        h-12
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-800/70
                        px-4
                        pr-12
                        outline-none
                        transition-all
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-400/20
                        ${className}
                    `}

                    {...props}

                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2">

                    {

                        loading && (

                            <Loader2

                                size={18}

                                className="animate-spin text-cyan-400"

                            />

                        )

                    }

                    {

                        success && !loading && (

                            <CheckCircle2

                                size={18}

                                className="text-green-400"

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

                    <p className="text-sm text-green-400">

                        {success}

                    </p>

                )

            }

        </div>

    );

}