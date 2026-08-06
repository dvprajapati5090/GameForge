import { Search } from 'lucide-react';

const F = '"Space Mono", monospace';

const GAMES = ['All', 'VALORANT', 'BGMI', 'FREE_FIRE'];

export default function TournamentFilters({ search, setSearch, gameFilter, setGameFilter }) {
    return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search input — matches Players page pattern */}
            <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 200 }}>
                <span style={{
                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
                }}>
                    <Search size={15} />
                </span>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by tournament name..."
                    style={{
                        width: '100%', padding: '12px 16px 12px 40px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: 10, color: '#fff', fontSize: 13,
                        fontFamily: F, outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
            </div>

            {/* Game filter pills — same as players page style */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {GAMES.map(game => {
                    const active = gameFilter === game;
                    return (
                        <button
                            key={game}
                            onClick={() => setGameFilter(game)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: 8,
                                border: `1px solid ${active ? 'rgba(232,0,61,0.6)' : 'rgba(255,255,255,0.1)'}`,
                                background: active ? 'rgba(232,0,61,0.15)' : 'rgba(255,255,255,0.03)',
                                color: active ? '#e8003d' : 'rgba(255,255,255,0.5)',
                                fontSize: 11, fontFamily: F, fontWeight: active ? 700 : 400,
                                cursor: 'pointer', letterSpacing: '0.06em',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {game === 'All' ? 'ALL GAMES' : game}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}