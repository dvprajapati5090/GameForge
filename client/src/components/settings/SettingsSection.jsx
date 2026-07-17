import GlowCard from "../ui/GlowCard";

export default function SettingsSection({

    title,

    description,

    children

}) {

    return (

        <GlowCard className="p-8">

            <h2 className="text-2xl font-black">

                {title}

            </h2>

            <p className="text-gray-400 mt-2 mb-8">

                {description}

            </p>

            {children}

        </GlowCard>

    );

}