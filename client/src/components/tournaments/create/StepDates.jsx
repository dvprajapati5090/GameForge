import Button from "../../ui/Button";

export default function StepDates({

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
        [color-scheme:dark]
    `;



    const validateDates = () => {

        if(!form.registrationStart ||
           !form.registrationEnd ||
           !form.tournamentStart
        ){

            return false;

        }


        return (
            new Date(form.registrationEnd) >
            new Date(form.registrationStart)
        )
        &&
        (
            new Date(form.tournamentStart) >
            new Date(form.registrationEnd)
        );

    };




    const fields = [

        {
            key: "registrationStart",
            title: "Registration Opens",
            description: "Teams can start registering from this time."
        },

        {
            key: "registrationEnd",
            title: "Registration Closes",
            description: "Last time for teams to register."
        },

        {
            key: "tournamentStart",
            title: "Tournament Begins",
            description: "Official tournament starting time."
        }

    ];



    return (

        <div className="space-y-8">


            <div>

                <h2 className="
                    text-2xl font-bold font-mono
                    text-white
                ">
                    Tournament Schedule
                </h2>

                <p className="
                    mt-2
                    text-sm
                    text-slate-400
                ">
                    Each date must be after the previous date.
                </p>

            </div>




            <div className="space-y-5">


                {
                    fields.map((field,index)=>(

                        <div
                            key={field.key}
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-5
                            "
                        >

                            <h3 className="
                                text-white
                                font-semibold
                                mb-4
                            ">

                                {field.title}

                                <span className="
                                    text-red-400
                                    ml-1
                                ">
                                    *
                                </span>

                            </h3>


                            <p className="
                                text-xs
                                text-slate-400
                                mb-4
                            ">
                                {field.description}
                            </p>



                            <input

                                type="datetime-local"

                                value={form[field.key]}

                                min={
                                    index === 1
                                    ?
                                    form.registrationStart
                                    :
                                    index === 2
                                    ?
                                    form.registrationEnd
                                    :
                                    undefined
                                }

                                onChange={e =>
                                    update(
                                        field.key,
                                        e.target.value
                                    )
                                }

                                className={inputClass}

                            />



                        </div>

                    ))
                }


            </div>





            {
                form.registrationStart &&
                form.registrationEnd &&
                new Date(form.registrationEnd) <=
                new Date(form.registrationStart) && (

                    <p className="
                        text-red-400
                        text-sm
                    ">
                        Registration closing date must be after registration opening date.
                    </p>

                )
            }





            {
                form.registrationEnd &&
                form.tournamentStart &&
                new Date(form.tournamentStart) <=
                new Date(form.registrationEnd) && (

                    <p className="
                        text-red-400
                        text-sm
                    ">
                        Tournament start date must be after registration closing date.
                    </p>

                )
            }







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

                    disabled={!canProceed || !validateDates()}

                    className={
                        canProceed && validateDates()
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