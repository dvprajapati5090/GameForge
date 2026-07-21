import { useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getBracket,
    generateBracket
} from "../services/tournament.service";

import BracketRound from "../components/host/matches/BracketRound";

export default function HostBracketPage() {

    const { id } = useParams();
    const location = useLocation();

    console.log("PATH =", location.pathname);
    console.log("PARAMS =", { id });

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({

        queryKey: ["bracket", id],

        queryFn: () => getBracket(id)

    });

    const generateMutation = useMutation({

        mutationFn: () => generateBracket(id),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["bracket", id]

            });

        }

    });

    if (isLoading) {

        return (

            <div className="py-20 text-center">

                Loading Bracket...

            </div>

        );

    }

    const bracket = data?.data || {};

    if (Object.keys(bracket).length === 0) {

        return (

            <div className="py-24 text-center">

                <h1 className="text-3xl font-black">

                    Bracket Not Generated

                </h1>

                <p className="text-gray-400 mt-3">

                    Register at least two teams, then generate the tournament bracket.

                </p>

                <button

                    onClick={() => generateMutation.mutate()}

                    disabled={generateMutation.isPending}

                    className="
                        mt-8
                        px-8
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-purple-600
                        font-bold
                        disabled:opacity-50
                    "

                >

                    {

                        generateMutation.isPending

                            ? "Generating..."

                            : "Generate Bracket"

                    }

                </button>

            </div>

        );

    }

    return (

        <div
            className="
                flex
                gap-28
                overflow-x-auto
                pb-8
                items-center
            "
        >

            {

                Object.entries(bracket).map(

                    ([round, matches]) => (

                        <BracketRound

                            key={round}

                            round={round}

                            matches={matches}

                        />

                    )

                )

            }

        </div>

    );

}