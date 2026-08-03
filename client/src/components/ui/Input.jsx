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

        <div className="flex flex-col gap-2 w-full">


            {
                label && (

                    <label className="
                        block
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
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
                        h-11

                        rounded-xl

                        border
                        border-white/20

                        bg-white/10

                        px-4
                        pr-10

                        text-sm
                        !text-white

                        placeholder:!text-slate-400

                        caret-purple-400

                        outline-none

                        backdrop-blur-xl

                        transition-all
                        duration-300


                        shadow-lg
                        shadow-black/20


                        hover:border-white/30


                        focus:border-white/40

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
                                    text-white/80
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
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-slate-500
                    ">
                        {helper}
                    </p>

                )
            }





            {
                error && (

                    <p className="
                        text-[11px]
                        text-red-400
                    ">
                        {error}
                    </p>

                )
            }





            {
                success && (

                    <p className="
                        text-[11px]
                        text-emerald-400
                    ">
                        {success}
                    </p>

                )
            }


        </div>

    );

}