import Button from "../../ui/Button";

export default function StepPrizeRules({

    form,

    setForm,

    next,

    previous,

    canProceed

}) {


    const update = (field, value) =>
        setForm(prev => ({
            ...prev,
            [field]: value
        }));




    const inputClass = `
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-5
        py-4
        text-white
        outline-none
        transition-all
        duration-300
        hover:border-white/10
        focus:border-white/10
        focus:ring-2
        focus:ring-purple-500/20
    `;




    return (

        <div className="space-y-8">





            {/* Header */}

            <div>

                <h2 className="
                    text-2xl font-bold font-mono
                    text-white
                ">
                    Prize Pool & Rules
                </h2>


                <p className="
                    mt-2
                    text-sm
                    text-slate-400
                ">
                    Configure tournament rewards and rules.
                </p>


            </div>







            {/* Paid Tournament */}

            <div className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
            ">


                <div className="
                    flex
                    items-center
                    justify-between
                ">


                    <div>


                        <h3 className="
                            text-white
                            font-semibold
                        ">

                            Paid Tournament

                        </h3>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-1
                        ">
                            Enable entry fees for teams.
                        </p>


                    </div>





                    <label className="relative inline-flex cursor-pointer items-center">
    <input
        type="checkbox"
        className="sr-only"
        checked={form.isPaid || false}
        onChange={(e) =>
            setForm({
                ...form,
                isPaid: e.target.checked,
            })
        }
    />

    <div
        className={`
            relative
            h-6
            w-12
            rounded-full
            transition-all
            duration-300
            ${
                form.isPaid
                    ? "bg-black shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    : "bg-white/20"
            }
        `}
    >
        <div
            className={`
                absolute
                top-[2px]
                left-[2px]
                h-5
                w-5
                rounded-full
                bg-white
                transition-all
                duration-300
                ease-in-out
                ${
                    form.isPaid
                        ? "translate-x-5"
                        : "translate-x-0"
                }
            `}
        />
    </div>
</label>


                </div>







                {
                    form.isPaid && (


                        <div className="
                            mt-6
                        ">


                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-slate-300
                                mb-2
                            ">


                                Entry Fee (₹)

                                <span className="
                                    text-red-400
                                    ml-1
                                ">
                                    *
                                </span>


                            </label>




                            <input

                                type="number"

                                min="1"

                                placeholder="Enter entry fee"

                                value={form.entryFee || ""}

                                onChange={(e)=>

                                    update(
                                        "entryFee",
                                        Number(e.target.value)
                                    )

                                }

                                className={inputClass}

                            />


                        </div>


                    )
                }


            </div>








            {/* Prize Pool */}

            <div>


                <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-300
                    mb-2
                ">


                    Prize Pool (₹)

                    <span className="
                        text-red-400
                        ml-1
                    ">
                        *
                    </span>


                </label>




                <input

                    type="number"

                    min="0"

                    placeholder="Enter prize pool amount"

                    value={form.prizePool || ""}

                    onChange={(e)=>

                        update(
                            "prizePool",
                            e.target.value === ""
                            ?
                            0
                            :
                            Number(e.target.value)
                        )

                    }

                    className={inputClass}

                />


            </div>









            {/* Rules */}

            <div>


                <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-300
                    mb-3
                ">


                    Tournament Rules

                    <span className="
                        text-red-400
                        ml-1
                    ">
                        *
                    </span>


                </label>





                <textarea

                    rows="6"

                    placeholder="Write tournament rules..."

                    value={form.rules}

                    onChange={e =>
                        update(
                            "rules",
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        px-5
                        py-4
                        text-white
                        outline-none
                        resize-none
                        transition-all
                        duration-300
                        hover:border-white/10
                        focus:border-white/10
                        focus:ring-2
                        focus:ring-purple-500/20
                    "

                />


            </div>








            {/* Navigation */}

            <div className="
                flex
                justify-between
                pt-4
            ">



                <Button

                    variant="secondary"

                    onClick={previous}

                >

                    ← Back

                </Button>





                <Button

                    onClick={next}

                    disabled={!canProceed}

                    className={

                        canProceed

                        ?

                        `
                        shadow-[0_0_35px_rgba(168,85,247,0.7)]
                        hover:shadow-[0_0_50px_rgba(168,85,247,0.9)]
                        `

                        :

                        ""

                    }

                >

                    Continue →

                </Button>



            </div>





        </div>

    );

}