import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useAuthStore from "../../store/authStore";

import {
    deleteTournament,
    generateBracket
} from "../../services/tournament.service";

export default function TournamentActions({ tournament }) {

    const navigate = useNavigate();

    const user = useAuthStore(state => state.user);

    if (
        user?.role !== "HOST" ||
        user?._id !== tournament.organizer._id
    ) {
        return null;
    }

    const handleDelete = async () => {

        if (
            !window.confirm(
                "Delete this tournament?"
            )
        ) return;

        try {

            await deleteTournament(
                tournament._id
            );

            toast.success(
                "Tournament deleted"
            );

            navigate("/tournaments");

        }

        catch {

            toast.error(
                "Unable to delete tournament"
            );

        }

    };

    const handleBracket = async () => {

        try {

            await generateBracket(
                tournament._id
            );

            toast.success(
                "Bracket generated!"
            );

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Failed"

            );

        }

    };

    return (

        <div className="mt-10 flex gap-4 flex-wrap">

            <button
                className="
                    px-6
                    py-3
                    rounded-xl
                    bg-cyan-500
                    hover:bg-cyan-400
                "
            >

                Edit Tournament

            </button>

            <button
                onClick={handleBracket}
                className="
                    px-6
                    py-3
                    rounded-xl
                    bg-purple-600
                    hover:bg-purple-500
                "
            >

                Generate Bracket

            </button>

            <button
                onClick={handleDelete}
                className="
                    px-6
                    py-3
                    rounded-xl
                    bg-red-600
                    hover:bg-red-500
                "
            >

                Delete Tournament

            </button>

        </div>

    );

}