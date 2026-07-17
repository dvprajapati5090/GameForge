import useAcceptInvitation from "../../hooks/useAcceptInvitation";
import useRejectInvitation from "../../hooks/useRejectInvitation";

export default function NotificationCard({

    invitation

}) {

    const accept = useAcceptInvitation();

    const reject = useRejectInvitation();

    return (

        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
            "
        >

            <p className="text-xs font-bold text-cyan-400">

                TEAM INVITATION

            </p>

            <h3 className="text-xl font-black mt-2">

                {invitation.team?.name || "Deleted Team"}

            </h3>

            <p className="text-gray-400 mt-2">

                Invited by

            </p>

            <p className="font-semibold">

                {invitation.sender?.displayName || "Unknown Player"}

            </p>

            <p className="text-gray-500 mt-3 text-sm">

                {invitation.team?.description || ""}

            </p>

            <div className="flex gap-3 mt-6">

                <button

                    onClick={() => accept.mutate(invitation._id)}

                    className="
                        flex-1
                        rounded-xl
                        bg-emerald-500
                        py-2.5
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
                        py-2.5
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