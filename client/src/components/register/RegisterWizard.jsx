import { useState } from "react";

import { motion } from "framer-motion";

import StepIndicator from "./StepIndicator";

import StepBasicInfo from "./StepBasicInfo";

import StepRoleSelection from "./StepRoleSelection";

import StepRiotVerification from "./StepRiotVerification";

import StepReview from "./StepReview";

export default function RegisterWizard() {

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({

        username: "",

        displayName: "",

        email: "",

        password: "",

        confirmPassword: "",

        role: "",

        riotGameName: "",

        riotTagLine: "",

        region: "ap"

    });

    const [riotProfile, setRiotProfile] = useState(null);

    return (

        <motion.section

            initial={{
                opacity: 0,
                y: 40
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            className="
                w-full
                max-w-5xl
                rounded-[32px]
                border
                border-white/10
                bg-slate-900/70
                backdrop-blur-xl
                shadow-2xl
                overflow-hidden
            "

        >

            <div
                className="
                    border-b
                    border-white/10
                    px-10
                    py-8
                "
            >

                <h1
                    className="
                        text-4xl
                        font-black
                        bg-gradient-to-r
                        from-cyan-400
                        to-purple-500
                        bg-clip-text
                        text-transparent
                    "
                >

                    Create your GameForge Account

                </h1>

                <p className="text-gray-400 mt-3">

                    Join tournaments, build teams and compete.

                </p>

            </div>

            <div className="px-10 py-8">

                <StepIndicator step={step} />

                <div className="mt-12">

                    {
                        step === 1 && (

                            <StepBasicInfo

                                form={form}

                                setForm={setForm}

                                next={() => setStep(2)}

                            />

                        )
                    }

                    {

                        step === 2 && (

                            <StepRoleSelection

                                form={form}

                                setForm={setForm}

                                next={() => setStep(3)}

                                back={() => setStep(1)}

                            />

                        )

                    }

                    {

                        step === 3 && (

                            <StepRiotVerification

                                form={form}

                                setForm={setForm}

                                riotProfile={riotProfile}

                                setRiotProfile={setRiotProfile}

                                next={() => setStep(4)}

                                back={() => setStep(2)}

                            />

                        )

                    }

                    {

                        step === 4 && (

                            <StepReview

                                form={form}

                                riotProfile={riotProfile}

                                back={() => setStep(3)}

                            />

                        )

                    }

                </div>

            </div>

        </motion.section>

    );

}