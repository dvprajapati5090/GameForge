import { Users } from "lucide-react";

export default function PlayersHeader() {

    return (

        <div>

            <div className="flex items-center gap-4">

                <Users
                    size={34}
                    className="text-cyan-400"
                />

                <h1 className="text-5xl font-black">

                    Players

                </h1>

            </div>

            <p className="text-gray-400 mt-3">

                Discover teammates and invite them to your squad.

            </p>

        </div>

    );

}