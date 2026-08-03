export default function RankBadge({ rank = 'UNRANKED' }) {
  if (!rank || rank === 'UNRANKED') {
    return (
      <span style={{
        padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: '"Space Mono", monospace',
        letterSpacing: '0.08em', border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
      }}>
        UNRANKED
      </span>
    );
  }
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: '"Space Mono", monospace',
      letterSpacing: '0.08em', border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.08)', color: '#fff',
    }}>
      {rank}
    </span>
  );
}