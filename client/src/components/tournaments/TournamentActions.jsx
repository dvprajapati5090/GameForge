
import useAuthStore from "../../store/authStore";
import useGenerateBracket from "../../hooks/useGenerateBracket";
import useDeleteTournament from "../../hooks/useDeleteTournament";

export default function TournamentActions({ tournament }) {

    const user = useAuthStore(state => state.user);

    const generateMutation = useGenerateBracket();
    const deleteMutation = useDeleteTournament();

    if (
        user?.role !== "HOST" ||
        user?._id !== tournament.organizer._id
    ) {
        return null;
    }

    const handleDelete = () => {

        if (
            !window.confirm(
                "Delete this tournament?"
            )
        ) return;

        deleteMutation.mutate(tournament._id);

    };

    const handleBracket = () => {

        generateMutation.mutate(tournament._id);

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
                    bg-black
                    hover:bg-black
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
                    bg-white/20
                    hover:bg-white/20
                "
            >

                Delete Tournament

            </button>

        </div>

    );

}