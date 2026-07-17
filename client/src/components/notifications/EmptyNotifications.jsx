import { BellOff } from "lucide-react";

export default function EmptyNotifications() {

    return (

        <div
            className="
                py-12
                flex
                flex-col
                items-center
                text-center
            "
        >

            <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-cyan-500/10
                    flex
                    items-center
                    justify-center
                    mb-5
                "
            >

                <BellOff

                    size={36}

                    className="text-cyan-400"

                />

            </div>

            <h3 className="text-lg font-bold">

                You're all caught up

            </h3>

            <p
                className="
                    text-gray-400
                    mt-2
                    max-w-[240px]
                "
            >

                No pending invitations or notifications.

            </p>

        </div>

    );

}