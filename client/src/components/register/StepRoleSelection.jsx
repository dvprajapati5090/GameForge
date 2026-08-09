import { Gamepad2, Trophy, CheckCircle2 } from "lucide-react";

import GlowCard from "../ui/GlowCard";
import Button from "../ui/Button";

export default function StepRoleSelection({

    form,

    setForm,

    next,

    back

}) {

    function selectRole(role) {

        setForm((prev) => ({

            ...prev,

            role

        }));

    }

    return (

        <div className="flex flex-col gap-10">

            <div className="text-center">

                <h2 className="text-2xl font-black">

                    Choose Your Journey

                </h2>

                <p className="text-xs text-gray-400 mt-2">

                    Select how you'll use GameForge

                </p>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

                <RoleCard

                    selected={form.role === "PLAYER"}

                    icon={<Gamepad2 size={48} />}

                    title="PLAYER"

                    description="Compete in tournaments"

                    features={[

                        "Join tournaments",

                        "Create & Join Teams",

                        "Track Rank",

                        "View Match History"

                    ]}

                    onClick={() => selectRole("PLAYER")}

                />

                <RoleCard

                    selected={form.role === "HOST"}

                    icon={<Trophy size={48} />}

                    title="HOST"

                    description="Create esports tournaments"

                    features={[

                        "Create tournaments",

                        "Manage participants",

                        "Generate brackets",

                        "Approve results"

                    ]}

                    onClick={() => selectRole("HOST")}

                />

            </div>

            <div className="flex justify-between">

                <Button

                    variant="secondary"

                    onClick={back}

                >

                    ← Back

                </Button>

                <Button

                    onClick={next}

                    disabled={!form.role}

                >

                    Continue →

                </Button>

            </div>

        </div>

    );

}

function RoleCard({

    selected,

    icon,

    title,

    description,

    features,

    onClick

}) {

    return (

        <GlowCard

            className={`
                relative
                p-8
                cursor-pointer
                transition-all
                duration-300
                ${selected
                    ? "border-[#e8003d] ring-2 ring-[#e8003d]/40"
                    : "border-white/20"
                }
            `}

        >

            <button

                onClick={onClick}

                className="w-full text-left"

            >

                {

                    selected && (

                        <CheckCircle2

                            className="
                                absolute
                                top-5
                                right-5
                                text-white
                            "

                            size={28}

                        />

                    )

                }

                <div className="text-white">

                    {icon}

                </div>

                <h3 className="text-xl font-black mt-4">

                    {title}

                </h3>

                <p className="text-xs text-gray-400 mt-1">

                    {description}

                </p>

                <ul className="mt-8 flex flex-col gap-3">

                    {

                        features.map((item) => (

                            <li

                                key={item}

                                className="flex items-center gap-3 text-sm"

                            >

                                <div
                                    className="
                                        w-2
                                        h-2
                                        rounded-full
                                        bg-[#e8003d]
                                    "
                                />

                                {item}

                            </li>

                        ))

                    }

                </ul>

            </button>

        </GlowCard>

    );

}