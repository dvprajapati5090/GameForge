/**
 * FavoriteGamesCard — Electric border wrapper, gaming theme
 */
import { motion } from "framer-motion";
import ElectricCard from "../ui/ElectricCard";

const gameIcons = {
    Valorant         : "🎯",
    CS2              : "🔫",
    BGMI             : "📱",
    "Rocket League"  : "🚗",
    "Apex Legends"   : "🔥",
    "League of Legends": "⚔️",
};

const GAME_COLORS = {
    Valorant         : "#e8003d",
    CS2              : "#f97316",
    BGMI             : "#eab308",
    "Rocket League"  : "#06b6d4",
    "Apex Legends"   : "#dc2626",
    "League of Legends": "#7c3aed",
};

export default function FavoriteGamesCard({ player }) {
    return (
        <ElectricCard
            color="#e8003d"
            color2="#ff5530"
            speed={8}
            rounded={20}
            gap={1.5}
            glow={0.2}
            style={{ fontFamily: '"Space Mono", monospace' }}
        >
            <div style={{ padding: '28px 28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                        Favourite Games
                    </h2>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    {player?.favoriteGames?.length ? (
                        player.favoriteGames.map((game, index) => {
                            const accent = GAME_COLORS[game] || '#e8003d';
                            return (
                                <motion.div
                                    key={game}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.08, duration: 0.3 }}
                                    whileHover={{ scale: 1.06, y: -4 }}
                                    style={{
                                        padding: '14px 20px',
                                        borderRadius: 16,
                                        border: `1px solid ${accent}33`,
                                        background: `linear-gradient(135deg, ${accent}15, rgba(8,2,12,0.9))`,
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'default',
                                        transition: 'box-shadow 0.25s ease',
                                        boxShadow: `0 0 12px ${accent}20`,
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 22px ${accent}45`; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 12px ${accent}20`; }}
                                >
                                    <div style={{ fontSize: 32, lineHeight: 1 }}>{gameIcons[game] || '🎮'}</div>
                                    <p style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
                                        {game}
                                    </p>
                                    <p style={{ fontSize: 9, color: accent, marginTop: 4, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.8 }}>
                                        Favourite
                                    </p>
                                </motion.div>
                            );
                        })
                    ) : (
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: '"Space Mono", monospace' }}>
                            No favourite games added yet.
                        </p>
                    )}
                </div>
            </div>
        </ElectricCard>
    );
}