import Button from "../../ui/Button";

import useTournamentMutations from "../../../hooks/useTournamentMutations";

export default function TournamentSettings({

    tournament

}) {

    const {

        deleteMutation,

        bracketMutation,

        completeMutation

    } = useTournamentMutations(tournament._id);

    return (

        <div className="space-y-6">

            <div className="rounded-3xl bg-slate-900 p-8">

                <h2 className="text-3xl font-black">

                    Tournament Settings

                </h2>

                <div className="mt-8 space-y-4">

                    <Button>

                        Edit Tournament

                    </Button>

                    <Button
                        onClick={() => bracketMutation.mutate()}
                    >

                        {
                            bracketMutation.isPending
                                ? "Generating..."
                                : "Generate Bracket"
                        }

                    </Button>

                    <Button

                        onClick={() => {

                            const winner = prompt(

                                "Enter Winner Team ID"

                            );

                            if (winner)

                                completeMutation.mutate(winner);

                        }}

                    >

                        {

                            completeMutation.isPending

                                ? "Completing..."

                                : "Complete Tournament"

                        }

                    </Button>

                    <Button

                        variant="danger"

                        onClick={() => {

                            if (

                                window.confirm(

                                    "Delete this tournament?"

                                )

                            ) {

                                deleteMutation.mutate();

                            }

                        }}

                    >

                        {

                            deleteMutation.isPending

                                ? "Deleting..."

                                : "Delete Tournament"

                        }

                    </Button>

                </div>

            </div>

        </div>

    );

}