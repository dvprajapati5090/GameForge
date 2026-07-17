export default function StepIndicator({

    step

}) {

    const steps = [

        "Basic",

        "Role",

        "Riot",

        "Preview"

    ];

    return (

        <div className="flex items-center justify-between">

            {

                steps.map((item, index) => (

                    <div

                        key={item}

                        className="flex-1 flex items-center"

                    >

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                flex-1
                            "
                        >

                            <div

                                className={`
                                    w-12
                                    h-12
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    font-bold
                                    transition-all
                                    ${
                                        step >= index + 1
                                            ? "bg-cyan-500 text-black"
                                            : "bg-white/10 text-gray-500"
                                    }
                                `}

                            >

                                {index + 1}

                            </div>

                            <p className="mt-3 text-sm">

                                {item}

                            </p>

                        </div>

                        {

                            index < steps.length - 1 && (

                                <div
                                    className={`
                                        h-1
                                        flex-1
                                        rounded-full
                                        ${
                                            step > index + 1
                                                ? "bg-cyan-500"
                                                : "bg-white/10"
                                        }
                                    `}
                                />

                            )

                        }

                    </div>

                ))

            }

        </div>

    );

}