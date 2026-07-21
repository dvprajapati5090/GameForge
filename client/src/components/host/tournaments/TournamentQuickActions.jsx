import Button from "../../ui/Button";
import { Link } from "react-router-dom";

export default function TournamentQuickActions({

    tournament,
    onDelete

}) {

    return (

        <div className="flex flex-wrap gap-4">

            <Link
                to={`/tournaments/${tournament._id}`}
            >

                <Button>

                    View

                </Button>

            </Link>

            <Link
                to={`/host/tournaments/${tournament._id}/edit`}
            >

                <Button>

                    Edit

                </Button>

            </Link>

            <Button
                variant="danger"
                onClick={onDelete}
            >

                Delete

            </Button>

        </div>

    );

}