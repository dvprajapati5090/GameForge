import { Crown, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

import InvitePlayerModal from "./InvitePlayerModal";

import useAuthStore from "../../store/authStore";

import { removeMember } from "../../services/team.service";

export default function TeamMembers({ team }) {

    const slots = [];

    const [openInvite, setOpenInvite] = useState(false);

    for (let i = 0; i < team.maxMembers; i++) {

        if (i < team.members.length) {

            slots.push(team.members[i]);

        } else {

            slots.push(null);

        }

    }

    return (

        <section className="mt-10">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-3xl font-black">

                    Team Members

                </h2>

                <span className="text-cyan-400 font-semibold">

                    {team.members.length}/{team.maxMembers} Players

                </span>

            </div>

            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6">

                {

                    slots.map((member, index) => (

                        member

                            ?

                            <MemberCard

                                key={member._id}

                                member={member}

                                captain={member._id === team.captain._id}

                                captainId={team.captain._id}

                            />

                            :

                            <InviteCard

                                key={index}

                                onClick={() => setOpenInvite(true)}

                            />

                    ))

                }

            </div>

            <InvitePlayerModal

                open={openInvite}

                onClose={() => setOpenInvite(false)}

            />

        </section>

    );

}

function MemberCard({

    member,

    captain,

    captainId

}) {

    const { user } = useAuthStore();

    const handleRemove = async () => {

        if (

            !window.confirm(

                `Remove ${member.displayName} from the team?`

            )

        ) {

            return;

        }

        const loading = toast.loading(

            "Removing player..."

        );

        try {

            await removeMember(member._id);

            toast.success(

                "Player removed successfully.",

                {

                    id: loading

                }

            );

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Failed to remove player.",

                {

                    id: loading

                }

            );

        }

    };

    return (

        <motion.div

            whileHover={{

                y: -6

            }}

            className="
                relative
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-slate-900
                to-[#15243b]
                p-6
                overflow-hidden
            "

        >

            {

                member.riotCard && (

                    <img

                        src={`https://media.valorant-api.com/playercards/${member.riotCard}/largeart.png`}

                        alt=""

                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            opacity-20
                        "

                    />

                )

            }

            <div

                className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-slate-900/40
                    via-slate-900/80
                    to-slate-950
                "

            />

            <div

                className="
                    absolute
                    -top-10
                    -right-10
                    w-28
                    h-28
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                "

            />

            {

                captain && (

                    <div

                        className="
                            absolute
                            top-4
                            right-4
                            text-yellow-400
                        "

                    >

                        <Crown size={20} />

                    </div>

                )

            }

            <div className="relative z-10">

                <div

                    className="
                        relative
                        w-24
                        h-24
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-500
                        to-purple-600
                        p-1.5
                        mx-auto
                        shadow-[0_0_25px_rgba(6,182,212,0.35)]
                    "

                >

                    <div

                        className="
                            w-full
                            h-full
                            rounded-full
                            overflow-hidden
                            bg-slate-900
                        "

                    >

                        {
                            member.avatar ? (

                                <img

                                    src={member.avatar}

                                    alt={member.displayName}

                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "

                                />

                            ) : member.riotCard ? (

                                <img

                                    src={`https://media.valorant-api.com/playercards/${member.riotCard}/displayicon.png`}

                                    alt={member.displayName}

                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "

                                />

                            ) : (

                                <div

                                    className="
                                        w-full
                                        h-full
                                        flex
                                        items-center
                                        justify-center
                                        text-3xl
                                        font-black
                                    "

                                >

                                    {member.displayName.charAt(0).toUpperCase()}

                                </div>

                            )

                        }

                    </div>

                </div>

                <h3

                    className="
                        mt-5
                        text-xl
                        font-bold
                        text-center
                    "

                >

                    {member.displayName}

                </h3>

                <p

                    className="
                        text-gray-400
                        text-center
                        mt-1
                    "

                >

                    @{member.username}

                </p>

                {

                    member.riotVerified && (

                        <div

                            className="
                                mt-3
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-emerald-500/30
                                bg-emerald-500/10
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-emerald-400
                            "

                        >

                            ● Riot Verified

                        </div>

                    )

                }

                <div

                    className="
                        mt-6
                        rounded-xl
                        bg-white/5
                        border
                        border-white/10
                        py-3
                        text-center
                    "

                >

                    <p className="text-gray-400 text-sm">

                        Rank

                    </p>

                    <h4 className="font-bold mt-1">

                        {member.currentRank}

                    </h4>

                </div>

                {

                    user?._id === captainId &&

                    !captain && (

                        <button

                            onClick={handleRemove}

                            className="
                                mt-5
                                w-full
                                rounded-xl
                                bg-red-600
                                hover:bg-red-700
                                transition
                                py-2
                                font-semibold
                                text-white
                            "

                        >

                            Remove Player

                        </button>

                    )

                }

            </div>

        </motion.div>

    );

}

function InviteCard({

    onClick

}) {

    return (

        <motion.button

            onClick={onClick}

            whileHover={{

                y: -6,

                scale: 1.02

            }}

            whileTap={{

                scale: 0.97

            }}

            className="
                rounded-3xl
                border-2
                border-dashed
                border-cyan-500/30
                bg-white/5
                h-full
                min-h-[270px]
                flex
                flex-col
                items-center
                justify-center
                transition
                hover:border-cyan-400
                hover:bg-cyan-500/5
            "

        >

            <Plus

                size={40}

                className="text-cyan-400"

            />

            <h3

                className="
                    mt-4
                    text-lg
                    font-bold
                "

            >

                Invite Player

            </h3>

            <p

                className="
                    mt-2
                    text-gray-400
                    text-center
                    px-6
                "

            >

                Fill this slot with your next teammate.

            </p>

        </motion.button>

    );

}