export default function TeamLogo({
    team,
    size = "h-16 w-16",
    className = ""
}) {
    if (team?.logo) {
        return (
            <img
                src={team.logo}
                alt={team.name}
                className={`
                    ${size}
                    rounded-full
                    object-cover
                    border
                    border-[#e8003d]/30
                    ${className}
                `}
            />
        );
    }

    return (
        <div
            className={`
                ${size}
                rounded-full
                bg-gradient-to-br
                from-[#e8003d]
                to-[#7a0020]
                flex
                items-center
                justify-center
                text-white
                font-bold
                ${className}
            `}
        >
            {team?.name?.charAt(0)?.toUpperCase()}
        </div>
    );
}