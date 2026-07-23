import Button from "../../ui/Button";

export default function TournamentHeader({

    tournament,
    onEdit,
    onDelete

}) {

    return (

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">

            {/* Banner */}
            <div className="relative h-72">

                {tournament.banner ? (

                    <img
                        src={tournament.banner}
                        alt={tournament.name}
                        className="h-full w-full object-cover"
                    />

                ) : (

                    <div className="h-full w-full bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700" />

                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Tournament Info */}
                <div className="absolute bottom-8 left-8">

                    <h1 className="text-5xl font-black text-white">

                        {tournament.name}

                    </h1>

                    <p className="mt-3 max-w-3xl text-lg text-gray-200">

                        {tournament.description || "No description provided."}

                    </p>

                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 p-6">

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