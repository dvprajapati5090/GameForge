export default function TournamentDescription({

    description

}) {

    return (

        <div
            className="
                mt-10
                bg-slate-900
                rounded-2xl
                border
                border-slate-800
                p-8
            "
        >

            <h2 className="text-2xl font-bold mb-4">

                Description

            </h2>

            <p className="text-gray-300 leading-8">

                {description}

            </p>

        </div>

    );

}