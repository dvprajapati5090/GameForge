import useBracket from "../../hooks/useBracket";

import Bracket from "../bracket/Bracket";

export default function TournamentBracket({

    tournamentId

}) {

    const {

        data,

        isLoading

    } = useBracket(tournamentId);

    if (isLoading)

        return <div>Loading...</div>;

    if (!data?.data?.rounds)

        return null;

    const challongeUrl = data?.data?.tournament?.challongeUrl ?? null;

    return (

        <Bracket

            rounds={data.data.rounds}

            challongeUrl={challongeUrl}

        />

    );

}