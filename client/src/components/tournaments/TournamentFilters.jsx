export default function TournamentFilters() {

    return (

        <div
            className="
                flex
                gap-4
                flex-wrap
            "
        >

            <input

                placeholder="Search tournament..."

                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-lg
                    px-4
                    py-3
                    flex-1
                "

            />

            <select
                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-lg
                    px-4
                "
            >

                <option>

                    All Games

                </option>

                <option>

                    VALORANT

                </option>

                <option>

                    BGMI

                </option>

                <option>

                    FREE_FIRE

                </option>

            </select>

        </div>

    );

}