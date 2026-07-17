import { Users } from "lucide-react";

export default function EmptyPlayers() {

    return (

        <div className="text-center py-20">

            <Users
                size={60}
                className="mx-auto text-gray-500"
            />

            <h2 className="text-3xl font-bold mt-6">

                No Players Found

            </h2>

        </div>

    );

}