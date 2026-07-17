import useAcceptInvitation from "../../hooks/useAcceptInvitation";
import useRejectInvitation from "../../hooks/useRejectInvitation";

export default function InvitationCard({ invitation }) {

    const accept = useAcceptInvitation();
    const reject = useRejectInvitation();

    return (

        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-slate-900/70
                p-4
            "
        >

            <h3 className="font-bold text-lg">

                {invitation.team.name}

            </h3>

            <p className="text-gray-400 mt-1">

                invited you to join the team

            </p>

            <div className="flex gap-3 mt-5">

                <button

                    onClick={() => accept.mutate(invitation._id)}

                    className="
                        flex-1
                        rounded-xl
                        bg-emerald-500
                        py-2
                        font-semibold
                        hover:bg-emerald-400
                        transition
                    "

                >

                    Accept

                </button>

                <button

                    onClick={() => reject.mutate(invitation._id)}

                    className="
                        flex-1
                        rounded-xl
                        bg-red-500
                        py-2
                        font-semibold
                        hover:bg-red-400
                        transition
                    "

                >

                    Reject

                </button>

            </div>

        </div>

    );

}