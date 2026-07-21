export default function TournamentTabs({

    tab,

    setTab

}) {

    const tabs = [

        "overview",

        "teams",

        "bracket",

        "rules"

    ];

    return (

        <div className="flex gap-3">

            {

                tabs.map(item => (

                    <button

                        key={item}

                        onClick={() => setTab(item)}

                        className={`

                            px-6

                            py-3

                            rounded-xl

                            capitalize

                            transition

                            ${

                                tab === item

                                ?

                                "bg-cyan-500 text-white"

                                :

                                "bg-slate-800"

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