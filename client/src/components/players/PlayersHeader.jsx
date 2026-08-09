import { Sparkles } from "lucide-react";

export default function PlayersHeader() {

    return (

        <section className="relative overflow-hidden py-4">

            <div
                className="
                    absolute
                    left-40
                    top-6
                    h-56
                    w-56
                    rounded-full
                    bg-white
                    blur-[110px]
                "
            />

            <div className="relative">

                <div
                    className="
                        inline-flex
                        items-center
                        gap-2

                        rounded-full

                        border
                        border-white/20

                        bg-black

                        px-5
                        py-2

                        text-sm
                        font-semibold
                        text-white
                    "
                >

                    <Sparkles size={16} />

                    Player Database

                </div>

                <h1
                    className="
                        mt-5

                        text-7xl
                        font-black
                        leading-none
                        tracking-tight

                        bg-gradient-to-r
                        from-white
                        via-white
                        to-[#e8003d]

                        bg-clip-text
                        text-transparent
                    "
                >

                    Players

                </h1>

                <p
                    className="
                        mt-5
                        max-w-3xl

                        text-xl

                        leading-8

                        text-slate-400
                    "
                >

                    Discover teammates, build your dream squad, recruit elite players
                    and dominate every tournament.

                </p>

            </div>

        </section>

    );

}