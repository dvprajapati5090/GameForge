import { useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getBracket,
    generateBracket
} from "../services/tournament.service";

import Bracket from "../components/bracket/Bracket";

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

    const bracketData = data?.data || {};
    const rounds = bracketData.rounds ?? [];
    const challongeUrl = bracketData.tournament?.challongeUrl ?? null;
    const hasBracket = rounds.length > 0;

    if (!hasBracket) {

        return (

            <div className="py-24 text-center">

                <h1 className="text-3xl font-black">

                    Bracket Not Generated

                </h1>

                <p className="text-gray-400 mt-3">

                    Register at least two teams, then generate the tournament bracket.

                </p>

                {generateMutation.isError && (
                    <p className="text-red-400 mt-3 text-sm">
                        {generateMutation.error?.response?.data?.message ?? "Failed to generate bracket."}
                    </p>
                )}

                <button

                    onClick={() => generateMutation.mutate()}

                    disabled={generateMutation.isPending}

                    className="
                        mt-8
                        px-8
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-[#e8003d]
                        to-[#7a0020]
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

        <div className="space-y-6">

            <Bracket

                rounds={rounds}

                isHost={true}

                challongeUrl={challongeUrl}

            />

        </div>

    );

}