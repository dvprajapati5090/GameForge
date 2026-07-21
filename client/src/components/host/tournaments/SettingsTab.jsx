import Button from "../../ui/Button";

import useGenerateBracket from "../../../hooks/useGenerateBracket";


export default function SettingsTab({

    tournament

}) {


    const mutation = useGenerateBracket();


    return (

        <div className="space-y-4">


            <Button

                onClick={() => 
                    mutation.mutate(tournament._id)
                }

            >

                {
                    mutation.isPending
                    ?
                    "Generating..."
                    :
                    "Generate Bracket"
                }


            </Button>


        </div>

    );

}