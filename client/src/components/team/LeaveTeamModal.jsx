import useLeaveTeam from "../../hooks/useLeaveTeam";
import { useNavigate } from "react-router-dom";

export default function LeaveTeamModal({

    open,

    onClose

}) {

    const leaveMutation = useLeaveTeam();

    const navigate = useNavigate();

    if (!open) return null;

    const handleLeave = () => {

        leaveMutation.mutate(

            undefined,

            {

                onSuccess: () => {

                    onClose();

                    navigate("/team");

                }

            }

        );

    };

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/70
                backdrop-blur-sm
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-red-500/20
                    bg-slate-900
                    p-8
                "
            >

                <h2 className="text-3xl font-black text-red-400">

                    Leave Team

                </h2>

                <p className="text-gray-400 mt-4">

                    Are you sure you want to leave this team?

                </p>

                <p className="text-gray-500 mt-2 text-sm">

                    If you're the captain, you may need to transfer captaincy first.

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={onClose}

                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-white/10
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleLeave}

                        disabled={leaveMutation.isPending}

                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-red-600
                            font-bold
                        "

                    >

                        {

                            leaveMutation.isPending

                                ? "Leaving..."

                                : "Leave Team"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}