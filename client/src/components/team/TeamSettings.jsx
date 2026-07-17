import {
    Pencil,
    UserPlus,
    Crown,
    LogOut
} from "lucide-react";

import { useState } from "react";

import useAuthStore from "../../store/authStore";

import EditTeamModal from "./EditTeamModal";
import InvitePlayerModal from "./InvitePlayerModal";
import TransferCaptainModal from "./TransferCaptainModal";
import LeaveTeamModal from "./LeaveTeamModal";

export default function TeamSettings({ team }) {

    const user = useAuthStore((state) => state.user);

    const isCaptain =
        user?._id === team.captain._id;

    const [editOpen, setEditOpen] = useState(false);

    const [inviteOpen, setInviteOpen] = useState(false);

    const [transferOpen, setTransferOpen] = useState(false);

    const [leaveOpen, setLeaveOpen] = useState(false);

    return (

        <section className="mt-12">

            <h2 className="text-3xl font-black">

                Team Management

            </h2>

            <p className="text-gray-400 mt-2">

                Manage your team and members.

            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                {

                    isCaptain && (

                        <>

                            <SettingCard

                                icon={<Pencil size={22} />}

                                title="Edit Team"

                                subtitle="Update team information"

                                onClick={() => setEditOpen(true)}

                            />

                            <SettingCard

                                icon={<UserPlus size={22} />}

                                title="Invite Player"

                                subtitle="Send team invitations"

                                onClick={() => setInviteOpen(true)}

                            />

                            <SettingCard

                                icon={<Crown size={22} />}

                                title="Transfer Captain"

                                subtitle="Give captain role"

                                onClick={() => setTransferOpen(true)}

                            />

                        </>

                    )

                }

                <SettingCard

                    icon={<LogOut size={22} />}

                    title="Leave Team"

                    subtitle="Exit your current team"

                    onClick={() => setLeaveOpen(true)}

                />

            </div>

            <EditTeamModal

                team={team}

                open={editOpen}

                onClose={() => setEditOpen(false)}

            />

            <InvitePlayerModal

                open={inviteOpen}

                onClose={() => setInviteOpen(false)}

            />

            <TransferCaptainModal

                team={team}

                open={transferOpen}

                onClose={() => setTransferOpen(false)}

            />

            <LeaveTeamModal

                open={leaveOpen}

                onClose={() => setLeaveOpen(false)}

            />

        </section>

    );

}

function SettingCard({

    icon,

    title,

    subtitle,

    onClick

}) {

    return (

        <button

            onClick={onClick}

            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                text-left
                hover:border-cyan-500
                hover:bg-cyan-500/5
                transition-all
            "

        >

            <div className="text-cyan-400">

                {icon}

            </div>

            <h3 className="mt-5 text-xl font-bold">

                {title}

            </h3>

            <p className="text-gray-400 mt-2">

                {subtitle}

            </p>

        </button>

    );

}