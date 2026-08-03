export default function OverviewTab({

    tournament

}) {

    return (

        <div className="rounded-3xl bg-black border border-white/10 p-8">

            <h2 className="text-2xl font-bold font-mono">

                Description

            </h2>

            <p className="mt-4 text-gray-300">

                {tournament.description}

            </p>

            <h2 className="mt-8 text-2xl font-bold font-mono">

                Rules

            </h2>

            <p className="mt-4 text-gray-300">

                {tournament.rules || "No rules"}

            </p>

        </div>

    );

}