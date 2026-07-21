import {
    CheckCircle,
    XCircle
} from "lucide-react";

export default function EligibilityChecklist({

    checks

}) {

    const Item = ({

        ok,

        text

    }) => (

        <div className="flex gap-3 items-center">

            {

                ok ?

                <CheckCircle
                    className="text-green-400"
                    size={18}
                />

                :

                <XCircle
                    className="text-red-400"
                    size={18}
                />

            }

            <span>

                {text}

            </span>

        </div>

    );

    return (

        <div className="space-y-3 mt-8">

            <Item
                ok={checks.hasTeam}
                text="Team Created"
            />

            <Item
                ok={checks.isCaptain}
                text="You are Captain"
            />

            <Item
                ok={checks.teamSize}
                text={`${checks.requiredPlayers} Players Ready`}
            />

            <Item
                ok={!checks.alreadyRegistered}
                text="Not Already Registered"
            />

            <Item
                ok={checks.registrationOpen}
                text="Registration Open"
            />

            <Item
                ok={!checks.tournamentFull}
                text="Slots Available"
            />

            <Item
                ok={checks.sameGame}
                text="Correct Game"
            />

        </div>

    );

}