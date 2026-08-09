import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function StepBasicInfo({

    form,
    setForm,
    next,
    canProceed

}) {


    const update = (field, value) =>
        setForm(prev => ({
            ...prev,
            [field]: value
        }));



    const selectClass = `
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-5
        py-4
        text-white
        outline-none
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/10
        focus:border-white/10
        focus:ring-2
        focus:ring-[#e8003d]/20
    `;



    const labelClass = `
        text-sm
        font-semibold
        text-slate-300
        mb-2
        block
    `;



    return (

        <div className="space-y-8">


            <div>

                <h2 className="
                    text-2xl font-bold font-mono
                    text-white
                ">
                    Tournament Information
                </h2>


                <p className="
                    mt-2
                    text-sm
                    text-slate-400
                ">
                    Configure the basic details of your esports tournament.
                </p>

            </div>




            {/* Tournament Name */}

            <div>

                <label className={labelClass}>
                    Tournament Name
                    <span className="text-red-400 ml-1">
                        *
                    </span>
                </label>


                <Input
    className="
        !text-white
        placeholder:!text-slate-400
        caret-[#e8003d]
    "
    placeholder="Enter tournament name"
    minLength={8}
    value={form.name}
    onChange={(e) =>
        update("name", e.target.value)
    }
/>

{form.name.length > 0 && form.name.length < 8 && (
    <p className="mt-2 text-sm text-red-400">
        Tournament name must contain at least 8 characters.
    </p>
)}

            </div>







            <div className="
                grid
                md:grid-cols-2
                gap-6
            ">



                {/* Game */}

                <div>

                    <label className={labelClass}>

                        Game

                        <span className="text-red-400 ml-1">
                            *
                        </span>

                    </label>


                    <select

                        value={form.game}

                        onChange={e =>
                            update(
                                "game",
                                e.target.value
                            )
                        }

                        className={selectClass}

                    >

                        <option className="bg-black border border-white/10">
                            VALORANT
                        </option>


                        <option className="bg-black border border-white/10">
                            BGMI
                        </option>


                        <option className="bg-black border border-white/10">
                            FREE_FIRE
                        </option>


                    </select>


                </div>






                {/* Mode */}

                <div>


                    <label className={labelClass}>

                        Game Mode

                        <span className="text-red-400 ml-1">
                            *
                        </span>

                    </label>



                    <select

                        value={form.mode}

                        onChange={e =>
                            update(
                                "mode",
                                e.target.value
                            )
                        }

                        className={selectClass}

                    >

                        <option className="bg-black border border-white/10">
                            SOLO
                        </option>


                        <option className="bg-black border border-white/10">
                            DUO
                        </option>


                        <option className="bg-black border border-white/10">
                            SQUAD
                        </option>


                        <option className="bg-black border border-white/10">
                            5V5
                        </option>


                    </select>


                </div>



            </div>








            {/* Format */}

            <div>


                <label className={labelClass}>

                    Tournament Format

                    <span className="text-red-400 ml-1">
                        *
                    </span>

                </label>




                <select

                    value={form.format}

                    onChange={e =>
                        update(
                            "format",
                            e.target.value
                        )
                    }

                    className={selectClass}

                >

                    <option className="bg-black border border-white/10">
                        SINGLE_ELIMINATION
                    </option>


                </select>


            </div>









            {/* Maximum Teams */}

            <div>


                <label className={labelClass}>

                    Maximum Teams

                    <span className="text-red-400 ml-1">
                        *
                    </span>

                </label>



                <select

                    value={form.maxTeams}

                    onChange={e =>
                        update(
                            "maxTeams",
                            Number(e.target.value)
                        )
                    }

                    className={selectClass}

                >


                    {
                        [4,8,16,32,64,128].map(team => (

                            <option

                                key={team}

                                value={team}

                                className="bg-black border border-white/10"

                            >

                                {team} teams

                            </option>

                        ))
                    }


                </select>


            </div>








            {/* Button */}

            <div className="
                flex
                justify-end
                pt-4
            ">


                <Button

                    onClick={next}

                    disabled={!canProceed || form.name.trim().length < 8}

                    className={

                        canProceed && form.name.trim().length >= 8

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