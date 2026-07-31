import { useState } from "react";

import StepBasicInfo from "../components/tournaments/create/StepBasicInfo";
import StepDates from "../components/tournaments/create/StepDates";
import StepPrizeRules from "../components/tournaments/create/StepPrizeRules";
import StepReview from "../components/tournaments/create/StepReview";


export default function CreateTournamentPage() {


    const [step, setStep] = useState(1);

    const [error, setError] = useState("");



    const [form, setForm] = useState({

        name: "",

        game: "VALORANT",

        mode: "5V5",

        format: "SINGLE_ELIMINATION",

        description: "",

        banner: "",

        maxTeams: 16,

        registrationStart: "",

        registrationEnd: "",

        tournamentStart: "",

        prizePool: 0,

        rules: "",

        isPaid: false,

        entryFee: 0

    });





    const canProceed = () => {

    if(step === 1){

        return Boolean(
            form.name.trim() &&
            form.game &&
            form.mode &&
            form.format &&
            form.maxTeams
        );

    }


    if(step === 2){

        return Boolean(
            form.registrationStart &&
            form.registrationEnd &&
            form.tournamentStart
        );

    }


    if(step === 3){

        if(form.isPaid){

            return Boolean(
                form.entryFee > 0 &&
                form.prizePool >= 0 &&
                form.rules.trim()
            );

        }


        return Boolean(
            form.prizePool >= 0 &&
            form.rules.trim()
        );

    }


    return true;

};






    const next = () => {


        let message = "";



        if(step === 1){


            if(!form.name.trim())

                message = "Tournament name is required.";


        }




        if(step === 2){


            if(!form.registrationStart)

                message = "Registration start date is required.";


            else if(!form.registrationEnd)

                message = "Registration end date is required.";


            else if(!form.tournamentStart)

                message = "Tournament start date is required.";


        }





        if(step === 3){


            if(form.isPaid && form.entryFee <= 0)

                message = "Entry fee is required for paid tournaments.";


            else if(!form.rules.trim())

                message = "Tournament rules are required.";


        }






        if(message){


            setError(message);


            setTimeout(()=>{

                setError("");

            },3000);


            return;

        }



        setStep(prev => prev + 1);


    };






    const previous = () => {


        setStep(prev => prev - 1);

    };






    const steps = [

        "Basic Info",

        "Schedule",

        "Prize & Rules",

        "Review"

    ];







    return (

        <div className="
            min-h-screen
            bg-gradient-to-br
            from-[#070712]
            via-[#111126]
            to-[#1c0d35]
            px-6
            py-10
        ">



            <div className="
                max-w-5xl
                mx-auto
            ">




                {
                    error && (

                        <div className="
                            mb-6
                            rounded-2xl
                            border
                            border-red-500/30
                            bg-red-500/10
                            px-6
                            py-4
                            text-red-300
                        ">

                            ⚠️ {error}

                        </div>

                    )
                }






                <div className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-8
                    mb-8
                ">


                    <h1 className="
                        text-4xl
                        font-bold
                        text-white
                    ">
                        Create Tournament 🏆
                    </h1>


                    <p className="
                        text-slate-400
                        mt-2
                    ">
                        Build and launch your next esports event.
                    </p>


                </div>







                <div className="
                    grid
                    grid-cols-4
                    gap-4
                    mb-8
                ">


                    {
                        steps.map((item,index)=>(

                            <div
                                key={item}
                                className={`
                                    rounded-2xl
                                    p-4
                                    border

                                    ${
                                        step === index + 1
                                        ?
                                        "border-purple-500 bg-purple-500/20"
                                        :
                                        step > index + 1
                                        ?
                                        "border-green-500/40 bg-green-500/10"
                                        :
                                        "border-white/10 bg-white/5"
                                    }
                                `}
                            >

                                <p className="
                                    text-white
                                    text-sm
                                    font-semibold
                                ">
                                    {index+1}. {item}
                                </p>

                            </div>

                        ))
                    }


                </div>








                <div className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-black/20
                    backdrop-blur-xl
                    p-8
                ">



                    {
                        step === 1 &&

                        <StepBasicInfo
                            form={form}
                            setForm={setForm}
                            next={next}
                            canProceed={canProceed()}
                        />

                    }





                    {
                        step === 2 &&

                        <StepDates
                            form={form}
                            setForm={setForm}
                            next={next}
                            previous={previous}
                            canProceed={canProceed()}
                        />

                    }





                    {
                        step === 3 &&

                        <StepPrizeRules
                            form={form}
                            setForm={setForm}
                            next={next}
                            previous={previous}
                            canProceed={canProceed()}
                        />

                    }





                    {
                        step === 4 &&

                        <StepReview
                            form={form}
                            previous={previous}
                        />

                    }



                </div>


            </div>


        </div>

    );

}