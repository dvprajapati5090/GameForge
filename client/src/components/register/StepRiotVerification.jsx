import {

    ShieldCheck,
    Search

} from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import useVerifyRiot from "../../hooks/useVerifyRiot";

export default function StepRiotVerification({

    form,

    setForm,

    riotProfile,

    setRiotProfile,

    next,

    back

}) {

    const verifyMutation = useVerifyRiot();

    async function handleVerify() {

        try {

            const response = await verifyMutation.mutateAsync({

                gameName: form.riotGameName,

                tagLine: form.riotTagLine,

                region: form.region

            });

            setRiotProfile(response.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="space-y-8">

            <div>

                <h2 className="text-4xl font-black">

                    Verify Riot Account

                </h2>

                <p className="text-gray-400 mt-2">

                    Link your Valorant profile.

                </p>

            </div>

            <Input

                label="Game Name"

                value={form.riotGameName}

                onChange={(e) =>

                    setForm({

                        ...form,

                        riotGameName: e.target.value

                    })

                }

            />

            <Input

                label="Tag Line"

                value={form.riotTagLine}

                onChange={(e) =>

                    setForm({

                        ...form,

                        riotTagLine: e.target.value

                    })

                }

            />

            <select

                value={form.region}

                onChange={(e) =>

                    setForm({

                        ...form,

                        region: e.target.value

                    })

                }

                className="
                    w-full
                    h-12
                    rounded-2xl
                    bg-slate-800
                    border
                    border-white/10
                    px-4
                "

            >

                <option value="ap">AP</option>
                <option value="eu">EU</option>
                <option value="na">NA</option>
                <option value="kr">KR</option>
                <option value="latam">LATAM</option>
                <option value="br">BR</option>

            </select>

            <Button

    loading={verifyMutation.isPending}

    onClick={handleVerify}

    className="
        group
        relative
        w-full
        h-14
        overflow-hidden
        rounded-2xl
        border
        border-violet-400/20
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-fuchsia-600
        shadow-lg
        shadow-violet-600/20
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-violet-500/40
        active:scale-[0.98]
    "

>

    {/* Shine */}

    <div
        className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            -translate-x-full
            group-hover:translate-x-full
            transition-transform
            duration-1000
        "
    />

    <div className="relative flex items-center justify-center gap-3">

        <Search
            size={19}
            className="
                transition-transform
                duration-300
                group-hover:rotate-6
                group-hover:scale-110
            "
        />

        <span className="font-semibold tracking-wide">

            Verify Riot ID

        </span>

    </div>

</Button>

                        {

                riotProfile && (

                    <div
                        className="
                            rounded-3xl
                            border
                            border-cyan-500/40
                            bg-cyan-500/5
                            p-8
                            space-y-4
                        "
                    >

                        <div className="flex items-center gap-3">

                            <ShieldCheck

                                className="text-green-400"

                            />

                            <h3 className="text-2xl font-black">

                                Riot Account Verified

                            </h3>

                        </div>

                        <img

                            src={riotProfile.playerCard}

                            alt="Player Card"

                            className="
                                rounded-2xl
                                w-full
                            "

                        />

                        <div className="grid grid-cols-2 gap-4">

                            <Stat
                                title="Level"
                                value={riotProfile.level}
                            />

                            <Stat
                                title="Current Rank"
                                value={riotProfile.currentRank}
                            />

                            <Stat
                                title="Highest Rank"
                                value={riotProfile.highestRank}
                            />

                            <Stat
                                title="RR"
                                value={riotProfile.rankRating}
                            />

                            <Stat
                                title="ELO"
                                value={riotProfile.elo}
                            />

                        </div>

                    </div>

                )

            }

            <div className="flex justify-between">

                <Button

                    variant="secondary"

                    onClick={back}

                >

                    Back

                </Button>

                <Button

                    disabled={!riotProfile}

                    onClick={next}

                >

                    Continue

                </Button>

            </div>

        </div>

    );

}

function Stat({

    title,

    value

}) {

    return (

        <div
            className="
                rounded-2xl
                bg-white/5
                p-4
            "
        >

            <p className="text-gray-400 text-sm">

                {title}

            </p>

            <h3 className="font-bold text-xl mt-1">

                {value}

            </h3>

        </div>

    );

}