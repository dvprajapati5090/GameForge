import useRegisterTournament from "../../hooks/useRegisterTournament";

export default function TournamentRegisterButton({

    tournament

}) {

    const registerMutation = useRegisterTournament();

    return (

        <div className="bg-black border border-white/10 rounded-xl p-6">

            <h2 className="text-xl font-bold mb-6">

                Registration

            </h2>

            <button
                onClick={() =>
                    registerMutation.mutate(tournament._id)
                }
                className="
                    w-full
                    bg-[#e8003d]
                    hover:bg-[#ff1a4f]
                    rounded-lg
                    py-3
                    font-bold
                "
            >

                Register Team

            </button>

        </div>

    );

}