export default function SectionTitle({

    title,

    subtitle

}) {

    return (

        <div className="mb-6">

            <h2
                className="
                    text-3xl
                    font-black
                "
            >

                {title}

            </h2>

            {

                subtitle && (

                    <p
                        className="
                            text-gray-400
                            mt-2
                        "
                    >

                        {subtitle}

                    </p>

                )

            }

        </div>

    );

}