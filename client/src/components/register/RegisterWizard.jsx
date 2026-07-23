import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import StepIndicator from "./StepIndicator";
import StepBasicInfo from "./StepBasicInfo";
import StepRoleSelection from "./StepRoleSelection";
import StepRiotVerification from "./StepRiotVerification";
import StepReview from "./StepReview";


export default function RegisterWizard() {

    const location = useLocation();


    const googleData =
        location.state?.googleData || null;

    const isGoogleUser = !!googleData;


    const [step, setStep] = useState(1);



    const [form,setForm]=useState({

        username:"",

        displayName:
            googleData?.displayName || "",


        email:
            googleData?.email || "",


        password:"",

        confirmPassword:"",

        role:"",


        riotGameName:"",

        riotTagLine:"",

        region:"ap"


    });


    const [riotProfile, setRiotProfile] = useState(null);

    return (

        <motion.section

            initial={{
                opacity: 0,
                y: 40,
                scale: 0.98
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.55
            }}

            whileHover={{
                y: -4
            }}

            className="
                relative

                overflow-hidden

                w-full
                max-w-5xl

                rounded-[30px]

                border
                border-violet-500/15

                bg-[#131B2E]/75

                backdrop-blur-[24px]

                shadow-2xl
                shadow-black/50
            "

        >

            {/* Top Glow */}

            <div
                className="
                    absolute

                    left-1/2
                    top-0

                    -translate-x-1/2

                    h-40
                    w-[26rem]

                    rounded-full

                    bg-violet-500/15

                    blur-3xl

                    pointer-events-none
                "
            />

            {/* Bottom Accent */}

            <div
                className="
                    absolute

                    bottom-0
                    left-0

                    h-[2px]
                    w-full

                    bg-gradient-to-r
                    from-transparent
                    via-violet-500/70
                    to-transparent
                "
            />

            {/* Corner Borders */}

            <div
                className="
                    absolute
                    left-6
                    top-6

                    h-8
                    w-8

                    border-l
                    border-t

                    border-violet-500/25
                "
            />

            <div
                className="
                    absolute
                    right-6
                    bottom-6

                    h-8
                    w-8

                    border-r
                    border-b

                    border-violet-500/25
                "
            />

            {/* HEADER */}

            <div
                className="
                    relative
                    z-10

                    px-10
                    py-8

                    border-b
                    border-white/10
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs

                                uppercase

                                tracking-[0.35rem]

                                text-slate-500
                            "
                        >
                            Esports Platform
                        </p>

                        <h1
                            className="
                                mt-2

                                text-4xl

                                font-black

                                tracking-tight

                                text-white
                            "
                        >
                            Create
                            <span className="text-violet-400">
                                {" "}GameForge
                            </span>
                            {" "}Account
                        </h1>

                        <p
                            className="
                                mt-3

                                max-w-xl

                                text-sm

                                leading-7

                                text-slate-400
                            "
                        >
                            Join tournaments, create teams, compete with
                            players across regions and build your esports
                            profile.
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-emerald-500/30

                            bg-emerald-500/10

                            px-4
                            py-2

                            text-[11px]

                            font-semibold

                            uppercase

                            tracking-[0.18rem]

                            text-emerald-300
                        "
                    >

                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                        Online

                    </div>

                </div>

            </div>

            <div
                className="
                    relative
                    z-10

                    px-10
                    py-8
                "
            >

                <StepIndicator step={step} />

                                <div className="mt-12">

                    {step === 1 && (

                        <StepBasicInfo
                            form={form}
                            setForm={setForm}
                            next={() => setStep(2)}
                            googleMode={isGoogleUser}
                        />

                    )}

                    {step === 2 && (

                        <StepRoleSelection
                            form={form}
                            setForm={setForm}
                            next={() => setStep(3)}
                            back={() => setStep(1)}
                        />

                    )}

                    {step === 3 && (

                        form.role === "PLAYER"

                            ? (

                                <motion.div

                                    initial={{
                                        opacity: 0,
                                        x: 30
                                    }}

                                    animate={{
                                        opacity: 1,
                                        x: 0
                                    }}

                                    transition={{
                                        duration: 0.35
                                    }}

                                >

                                    <StepRiotVerification

                                        form={form}
                                        setForm={setForm}

                                        riotProfile={riotProfile}
                                        setRiotProfile={setRiotProfile}

                                        next={() => setStep(4)}
                                        back={() => setStep(2)}

                                    />

                                </motion.div>

                            )

                            : (

                                <motion.div

                                    initial={{
                                        opacity: 0,
                                        x: 30
                                    }}

                                    animate={{
                                        opacity: 1,
                                        x: 0
                                    }}

                                    transition={{
                                        duration: 0.35
                                    }}

                                >

                                    <StepReview
                                        form={form}
                                        riotProfile={null}
                                        googleData={googleData}
                                        back={() => setStep(2)}
                                    />

                                </motion.div>

                            )

                    )}

                    {

                        step === 4 &&
                        form.role === "PLAYER" && (

                            <motion.div

                                initial={{
                                    opacity: 0,
                                    x: 30
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    duration: 0.35
                                }}

                            >

                                <StepReview
                                    form={form}
                                    riotProfile={riotProfile}
                                    googleData={googleData}
                                    back={() => setStep(3)}
                                />

                            </motion.div>

                        )

                    }

                </div>

            </div>

        </motion.section>

    );

}