import { Search } from "lucide-react";

export default function PlayersSearch({

    value,

    onChange

}) {

    return (

        <div className="relative mt-8 group">

            <div
                className="
                    absolute
                    inset-0
                    rounded-2xl
                    bg-violet-500/10
                    blur-xl
                    opacity-0
                    group-focus-within:opacity-100
                    transition-all
                    duration-300
                "
            />

            <div
                className="
                    relative
                    flex
                    items-center

                    rounded-2xl

                    border
                    border-white/10

                    bg-[#131A2C]/80
                    backdrop-blur-xl

                    transition-all
                    duration-300

                    group-focus-within:border-violet-400/40
                    group-focus-within:shadow-[0_0_25px_rgba(139,92,246,.18)]
                "
            >

                <Search
                    size={22}
                    className="
                        ml-6
                        mr-4
                        text-slate-500
                        transition-colors
                        duration-300
                        group-focus-within:text-violet-300
                    "
                />

                <input

                    value={value}

                    onChange={(e) => onChange(e.target.value)}

                    placeholder="Search players by name, Riot ID or username..."

                    className="
                        w-full

                        bg-transparent

                        py-5
                        pr-6

                        text-white
                        text-lg

                        placeholder:text-slate-500

                        outline-none
                    "

                />

            </div>

        </div>

    );

}