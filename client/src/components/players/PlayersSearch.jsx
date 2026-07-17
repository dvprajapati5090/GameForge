import { Search } from "lucide-react";

export default function PlayersSearch({

    value,

    onChange

}) {

    return (

        <div className="relative">

            <Search
                size={20}
                className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                "
            />

            <input

                value={value}

                onChange={(e) => onChange(e.target.value)}

                placeholder="Search Players..."

                className="
                    w-full
                    rounded-2xl
                    bg-slate-900
                    border
                    border-white/10
                    pl-14
                    pr-5
                    py-4
                    outline-none
                    focus:border-cyan-400
                "

            />

        </div>

    );

}