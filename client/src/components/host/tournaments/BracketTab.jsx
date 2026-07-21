import Button from "../../ui/Button";
import useBracket from "../../../hooks/useBracket";
import MatchCard from "./MatchCard";

import Bracket from "../../bracket/Bracket";

export default function BracketTab({ tournament }) {

    const {

        data,
        isLoading

    } = useBracket(tournament._id);

    if (isLoading)

        return <div>Loading Bracket...</div>;

    const rounds = data.data.rounds;

    return (

        <Bracket

            rounds={rounds}

            isHost={true}

        />

    );

}