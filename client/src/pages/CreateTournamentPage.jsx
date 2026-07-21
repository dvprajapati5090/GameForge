import { useState } from "react";

import StepBasicInfo from "../components/tournaments/create/StepBasicInfo";
import StepDates from "../components/tournaments/create/StepDates";
import StepPrizeRules from "../components/tournaments/create/StepPrizeRules";
import StepReview from "../components/tournaments/create/StepReview";

export default function CreateTournamentPage() {

    const [step, setStep] = useState(1);

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

        rules: ""

    });

    const next = () => setStep(step + 1);

    const previous = () => setStep(step - 1);

    return (

        <div className="max-w-4xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Create Tournament

            </h1>

            {

                step === 1 &&

                <StepBasicInfo

                    form={form}

                    setForm={setForm}

                    next={next}

                />

            }

            {

                step === 2 &&

                <StepDates

                    form={form}

                    setForm={setForm}

                    next={next}

                    previous={previous}

                />

            }

            {

                step === 3 &&

                <StepPrizeRules

                    form={form}

                    setForm={setForm}

                    next={next}

                    previous={previous}

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

    );

}