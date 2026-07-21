import Button from "../../ui/Button";


export default function TournamentHeader({

    tournament,
    onEdit,
    onDelete

}) {

    return (

        <div className="flex justify-between">

            <div>

                <h1 className="text-5xl font-black">

                    {tournament.name}

                </h1>

                <p className="mt-3 text-gray-400">

                    {tournament.description}

                </p>

            </div>


            <div className="flex gap-4">

                <Button
                    onClick={onEdit}
                >
                    Edit
                </Button>


                <Button
                    variant="danger"
                    onClick={onDelete}
                >
                    Delete
                </Button>

            </div>


        </div>

    );

}