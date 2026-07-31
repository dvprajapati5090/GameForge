import { 
    Loader2, 
    CheckCircle2, 
    XCircle 
} from "lucide-react";


export default function Input({

    label,

    helper,

    error,

    success,

    loading,

    disabled = false,

    className = "",

    ...props

}) {


    return (

        <div className="space-y-2">


            {
                label && (

                    <label className="
                        block
                        text-sm
                        font-semibold
                        text-slate-300
                    ">
                        {label}
                    </label>

                )
            }



            <div className="relative">


                <input

                    disabled={disabled}

                    className={`

                        w-full
                        h-14

                        rounded-2xl

                        border
                        border-white/10

                        bg-white/5

                        px-5
                        pr-12

                        !text-white

                        placeholder:!text-slate-400

                        caret-purple-400

                        outline-none

                        backdrop-blur-xl

                        transition-all
                        duration-300


                        shadow-lg
                        shadow-black/20


                        hover:border-purple-400/40


                        focus:border-purple-500

                        focus:ring-2
                        focus:ring-purple-500/20

                        focus:-translate-y-1


                        ${disabled
                            ? 
                            `
                            opacity-50
                            cursor-not-allowed
                            `
                            :
                            `
                            opacity-100
                            cursor-text
                            `
                        }


                        ${className}

                    `}

                    {...props}

                />



                <div className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                ">


                    {
                        loading && (

                            <Loader2

                                size={18}

                                className="
                                    animate-spin
                                    text-purple-400
                                "

                            />

                        )
                    }




                    {
                        success && !loading && (

                            <CheckCircle2

                                size={18}

                                className="
                                    text-emerald-400
                                "

                            />

                        )
                    }




                    {
                        error && !loading && (

                            <XCircle

                                size={18}

                                className="
                                    text-red-400
                                "

                            />

                        )
                    }



                </div>


            </div>





            {
                helper && !error && (

                    <p className="
                        text-xs
                        text-slate-500
                    ">
                        {helper}
                    </p>

                )
            }





            {
                error && (

                    <p className="
                        text-sm
                        text-red-400
                    ">
                        {error}
                    </p>

                )
            }





            {
                success && (

                    <p className="
                        text-sm
                        text-emerald-400
                    ">
                        {success}
                    </p>

                )
            }


        </div>

    );

}