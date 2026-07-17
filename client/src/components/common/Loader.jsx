import { Loader2 } from "lucide-react";

export default function Loader() {

    return (

        <div
            className="
                flex
                justify-center
                items-center
                min-h-[60vh]
            "
        >

            <Loader2
                className="
                    w-10
                    h-10
                    animate-spin
                    text-cyan-400
                "
            />

        </div>

    );

}