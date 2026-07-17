import { X } from "lucide-react";

export default function Modal({

    open,

    onClose,

    title,

    children

}) {

    if (!open) {

        return null;

    }

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                backdrop-blur-sm
            "
        >

            <div
                className="
                    relative
                    w-full
                    max-w-xl
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900
                    p-8
                    shadow-2xl
                "
            >

                <button

                    onClick={onClose}

                    className="
                        absolute
                        top-5
                        right-5
                        text-gray-400
                        hover:text-white
                    "

                >

                    <X size={22}/>

                </button>

                <h2 className="text-3xl font-black mb-8">

                    {title}

                </h2>

                {children}

            </div>

        </div>

    );

}