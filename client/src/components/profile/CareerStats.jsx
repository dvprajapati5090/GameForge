import CareerStatCard from "./CareerStatCard";

export default function CareerStats({ stats = {} }) {
    return (
        <div className="career-stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gap: 14,
        }}>
            <CareerStatCard icon="🎮" title="Matches"       value={stats?.matchesPlayed ?? 0}       index={0} />
            <CareerStatCard icon="✅" title="Wins"          value={stats?.wins ?? 0}                   index={1} />
            <CareerStatCard icon="❌" title="Losses"        value={stats?.losses ?? 0}                  index={2} />
            <CareerStatCard icon="🏆" title="Championships" value={stats?.championships ?? 0}          index={3} />
            <CareerStatCard icon="🏅" title="Tournaments"   value={stats?.tournamentsPlayed ?? 0}      index={4} />
            <CareerStatCard icon="📈" title="Win Rate"      value={`${stats?.winRate ?? 0}%`}          index={5} />
        </div>
    );
}