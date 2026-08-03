export default function PlayerAvatar({ player }) {
  const avatarUrl =
    player.avatar ||
    (player.riotCard
      ? `https://media.valorant-api.com/playercards/${player.riotCard}/smallart.png`
      : null);

  return (
    <img
      src={
        avatarUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(player.displayName)}&background=111&color=fff`
      }
      alt={player.displayName}
      style={{
        width: 80, height: 80, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.2)',
        objectFit: 'cover', background: '#111',
        display: 'block', margin: '0 auto',
      }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.displayName)}&background=111&color=fff`;
      }}
    />
  );
}