export default function StatChip({

    label,

    value

}) {

    return (

        <div
            className="
                px-5
                py-3
                rounded-xl
                border
                border-white/10
                bg-slate-900
            "
        >

            <p
                className="
                    text-xs
                    uppercase
                    text-gray-400
                "
            >

                {label}

            </p>

            <h3
                className="
                    mt-1
                    text-lg
                    font-bold
                "
            >

                {value}

            </h3>

        </div>

    );

}