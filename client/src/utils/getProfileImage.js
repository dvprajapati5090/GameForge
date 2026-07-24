export default function getProfileImage(user) {

    // Uploaded avatar has highest priority
    if (
        user?.avatar &&
        user.avatar.trim() !== ""
    ) {
        return user.avatar;
    }

    // Riot Card fallback
    if (user?.riotCard) {
        return `https://media.valorant-api.com/playercards/${user.riotCard}/largeart.png`;
    }

    // Default avatar
    return "/default-avatar.png";
}