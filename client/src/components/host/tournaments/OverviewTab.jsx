export default function OverviewTab({

    tournament

}) {

    return (

        <div className="rounded-3xl bg-slate-900 p-8">

            <h2 className="text-2xl font-bold">

                Description

            </h2>

            <p className="mt-4 text-gray-300">

                {tournament.description}

            </p>

            <h2 className="mt-8 text-2xl font-bold">

                Rules

            </h2>

            <p className="mt-4 text-gray-300">

                {tournament.rules || "No rules"}

            </p>

        </div>

    );

}