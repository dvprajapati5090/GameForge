import {
    CheckCircle2,
    ShieldCheck,
    User,
    Mail,
    Trophy
} from "lucide-react";

import Button from "../ui/Button";
import GlowCard from "../ui/GlowCard";

import useRegister from "../../hooks/useRegister";

import { useNavigate } from "react-router-dom";

export default function StepReview({

    form,

    riotProfile,

    back

}) {

    const navigate = useNavigate();

    const register = useRegister();

    async function handleRegister() {

        try {

            await register.mutateAsync({

                username: form.username,

                displayName: form.displayName,

                email: form.email,

                password: form.password,

                role: form.role,

                ...(form.role === "PLAYER" && {

                    gameName: form.riotGameName,

                    tagLine: form.riotTagLine,

                    region: form.region

                })

            });

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="space-y-8">

            <div className="text-center">

                <CheckCircle2
                    className="mx-auto text-green-400"
                    size={70}
                />

                <h2 className="text-4xl font-black mt-5">

                    Ready to Join GameForge

                </h2>

                <p className="text-gray-400 mt-2">

                    Review everything before creating your account.

                </p>

            </div>

            <GlowCard className="p-8 space-y-6">

                <ReviewRow

                    icon={<User size={18}/>}

                    label="Username"

                    value={form.username}

                />

                <ReviewRow

                    icon={<User size={18}/>}

                    label="Display Name"

                    value={form.displayName}

                />

                <ReviewRow

                    icon={<Mail size={18}/>}

                    label="Email"

                    value={form.email}

                />

                <ReviewRow

                    icon={<Trophy size={18}/>}

                    label="Role"

                    value={form.role}

                />

                {
                    form.role === "PLAYER" && riotProfile && (

                        <>

                            <ReviewRow
                                label="Riot ID"
                                value={`${riotProfile.gameName}#${riotProfile.tagLine}`}
                            />

                            <ReviewRow
                                label="Current Rank"
                                value={riotProfile.currentRank}
                            />

                            <ReviewRow
                                label="Highest Rank"
                                value={riotProfile.highestRank}
                            />

                            <ReviewRow
                                label="Account Level"
                                value={riotProfile.level}
                            />

                        </>

                    )
                }

            </GlowCard>

            <div className="flex justify-between">

                <Button

                    variant="secondary"

                    onClick={back}

                >

                    Back

                </Button>

                <Button

                    loading={register.isPending}

                    onClick={handleRegister}

                >

                    Create Account

                </Button>

            </div>

        </div>

    );

}

function ReviewRow({

    icon,

    label,

    value

}) {

    return (

        <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

                {icon}

                <span className="text-gray-400">

                    {label}

                </span>

            </div>

            <span className="font-semibold">

                {value}

            </span>

        </div>

    );

}