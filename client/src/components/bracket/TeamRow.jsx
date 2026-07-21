export default function TeamRow({

    team,

    winner

}) {

    return (

        <div
            className={`
                flex
                justify-between
                items-center
                rounded-xl
                px-4
                py-3

                ${winner
                    ? "bg-green-500/20 border border-green-500"
                    : "bg-white/5"}
            `}
        >

            <span>

                {

                    team

                        ? team.name

                        : "TBD"

                }

            </span>

            {

                winner && (

                    <span>

                        🏆

                    </span>

                )

            }

        </div>

    );

}