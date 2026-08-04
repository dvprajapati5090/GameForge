/**
 * TournamentTabs — Red/Silver gaming glass theme
 */
const F = '"Space Mono", monospace';

const TAB_LABELS = {
    overview: "Overview",
    teams: "Teams",
    bracket: "Bracket",
    rules: "Rules",
};

export default function TournamentTabs({ tab, setTab }) {
    const tabs = ["overview", "teams", "bracket", "rules"];

    return (
        <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap',
            padding: '4px', borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            width: 'fit-content',
        }}>
            {tabs.map(item => {
                const active = tab === item;
                return (
                    <button
                        key={item}
                        onClick={() => setTab(item)}
                        style={{
                            padding: '9px 20px', borderRadius: 12,
                            fontFamily: F, fontSize: 11, fontWeight: active ? 700 : 400,
                            letterSpacing: '0.06em', textTransform: 'capitalize',
                            cursor: 'pointer', border: 'none',
                            background: active
                                ? 'linear-gradient(135deg, #e8003d, #b5002e)'
                                : 'transparent',
                            color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                            boxShadow: active ? '0 0 16px rgba(232,0,61,0.3)' : 'none',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = active ? '' : 'rgba(255,255,255,0.06)'; }}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; } }}
                    >
                        {TAB_LABELS[item] || item}
                    </button>
                );
            })}
        </div>
    );
}