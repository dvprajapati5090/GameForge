import {
    Calendar,
    Clock,
    Users,
    CheckCircle,
    AlertCircle
} from "lucide-react";

import Button from "../ui/Button";

import useRegisterTournament from "../../hooks/useRegisterTournament";
import useWithdrawTournament from "../../hooks/useWithdrawTournament";

import useTournamentEligibility from "../../hooks/useTournamentEligibility";
import EligibilityChecklist from "./EligibilityChecklist";

export default function TournamentRegistrationCard({

    tournament

}) {

    const {

        data: eligibility,

        isLoading

    } = useTournamentEligibility(

        tournament._id

    );

    const registerMutation =
        useRegisterTournament();

    const withdrawMutation =
        useWithdrawTournament();

    const registered =
        tournament.registeredTeams?.length || 0;

    const isFull =
        registered >= tournament.maxTeams;

    const registrationClosed =
        new Date() >
        new Date(tournament.registrationEnd);

    const alreadyRegistered =
        tournament.isRegistered;

    return (

        <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900
            p-8
            sticky
            top-24
        "
        >

            <h2 className="text-2xl font-black">

                Registration

            </h2>

            <div className="mt-6">

                <div className="flex justify-between">

                    <span>

                        Registered Teams

                    </span>

                    <span className="font-bold">

                        {registered}/{tournament.maxTeams}

                    </span>

                </div>

                <div className="mt-3 h-3 rounded-full bg-slate-800 overflow-hidden">

                    <div

                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"

                        style={{

                            width: `${registered / tournament.maxTeams * 100}%`

                        }}

                    />

                </div>

            </div>

            <div className="space-y-5 mt-8">

                <Info

                    icon={<Calendar size={18}/>}

                    label="Registration Ends"

                    value={

                        new Date(

                            tournament.registrationEnd

                        ).toLocaleString()

                    }

                />

                <Info

                    icon={<Clock size={18}/>}

                    label="Tournament Starts"

                    value={

                        new Date(

                            tournament.tournamentStart

                        ).toLocaleString()

                    }

                />

                <Info

                    icon={<Users size={18}/>}

                    label="Format"

                    value={tournament.format.replaceAll("_"," ")}

                />

            </div>

            {

                !isLoading && eligibility && (

                    <EligibilityChecklist

                        checks={eligibility.data.checks}

                    />

                )

            }

            <div className="mt-10">

                {

                    alreadyRegistered ? (

                        <>

                            <div className="rounded-xl bg-green-500/15 border border-green-500/30 p-4 flex gap-3 items-center">

                                <CheckCircle
                                    className="text-green-400"
                                />

                                <span>

                                    Your team is registered

                                </span>

                            </div>

                            <Button

                                variant="danger"

                                className="w-full mt-5"

                                loading={withdrawMutation.isPending}

                                onClick={()=>

                                    withdrawMutation.mutate(

                                        tournament._id

                                    )

                                }

                            >

                                Withdraw Team

                            </Button>

                        </>

                    )

                    :

                    registrationClosed ? (

                        <div className="rounded-xl bg-red-500/15 border border-red-500/20 p-4 flex gap-3 items-center">

                            <AlertCircle/>

                            Registration Closed

                        </div>

                    )

                    :

                    isFull ? (

                        <div className="rounded-xl bg-red-500/15 border border-red-500/20 p-4 flex gap-3 items-center">

                            <AlertCircle/>

                            Tournament Full

                        </div>

                    )

                    :

                    (

                        <Button

                            className="w-full"

                            loading={registerMutation.isPending}

                            onClick={()=>

                                registerMutation.mutate(

                                    tournament._id

                                )

                            }

                        >

                            Register Team

                        </Button>

                    )

                }

            </div>

        </div>

    );

}

function Info({

    icon,

    label,

    value

}) {

    return (

        <div className="flex gap-4">

            <div className="text-cyan-400">

                {icon}

            </div>

            <div>

                <p className="text-gray-500 text-sm">

                    {label}

                </p>

                <p className="font-semibold">

                    {value}

                </p>

            </div>

        </div>

    );

}