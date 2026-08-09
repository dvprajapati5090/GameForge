const tabs = [

    "overview",

    "teams",

    "bracket",

    "settings"

];

export default function TournamentTabs({

    tab,

    setTab

}) {

    return (

        <div className="flex gap-4 border-b border-white/10">

            {

                tabs.map(item => (

                    <button

                        key={item}

                        onClick={() => setTab(item)}

                        className={`
                            pb-4
                            capitalize
                            font-semibold
                            transition

                            ${
                                tab === item
                                ? "border-b-2 border-[#e8003d] text-white"
                                : "text-gray-400"
                            }
                        `}
                    >

                        {item}

                    </button>

                ))

            }

        </div>

    );

}