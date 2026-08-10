import BracketRound from "./BracketRound";

export default function Bracket({

    rounds,

    isHost = false,

    challongeUrl = null

}) {

    return (

        <div className="space-y-6">

            {/* Challonge live bracket link */}
            {challongeUrl && (

                <a
                    href={challongeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(232,0,61,0.15) 0%, rgba(122,0,32,0.1) 100%)",
                        border: "1px solid rgba(232,0,61,0.35)",
                        color: "#ff4d7a",
                        fontWeight: 600,
                        fontSize: "14px",
                        textDecoration: "none",
                        letterSpacing: "0.01em",
                        backdropFilter: "blur(8px)",
                        transition: "all 0.2s ease",
                        boxShadow: "0 0 20px rgba(232,0,61,0.1)"
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "linear-gradient(135deg, rgba(232,0,61,0.25) 0%, rgba(122,0,32,0.2) 100%)";
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(232,0,61,0.2)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "linear-gradient(135deg, rgba(232,0,61,0.15) 0%, rgba(122,0,32,0.1) 100%)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(232,0,61,0.1)";
                    }}
                >
                    {/* Challonge logo icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e8003d" opacity="0.8"/>
                        <path d="M2 17L12 22L22 17" stroke="#e8003d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="#ff4d7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <span>View Live Bracket on Challonge</span>

                    {/* External link icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>

            )}

            {/* Bracket rounds */}
            <div className="overflow-x-auto">

                <div className="flex gap-12 min-w-max">

                    {

                        rounds.map(round => (

                            <BracketRound

                                key={round.round}

                                round={round}

                                isHost={isHost}

                            />

                        ))

                    }

                </div>

            </div>

        </div>

    );

}