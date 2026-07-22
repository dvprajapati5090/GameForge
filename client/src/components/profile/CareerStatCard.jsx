export default function CareerStatCard({

    title,

    value,

    icon

}) {

    return (

        <div
            className="

                bg-[#1b2333]

                rounded-2xl

                p-5

                border

                border-white/10

                hover:border-cyan-500

                transition

            "
        >

            <div className="text-3xl">

                {icon}

            </div>

            <div className="text-sm text-gray-400 mt-2">

                {title}

            </div>

            <div className="text-3xl font-bold mt-2">

                {value}

            </div>

        </div>

    );

}