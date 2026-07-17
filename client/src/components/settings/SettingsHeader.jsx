import { Settings } from "lucide-react";

export default function SettingsHeader() {

    return (

        <div>

            <div className="flex items-center gap-4">

                <Settings
                    size={36}
                    className="text-cyan-400"
                />

                <h1 className="text-5xl font-black">

                    Settings

                </h1>

            </div>

            <p className="text-gray-400 mt-3">

                Manage your GameForge account and preferences.

            </p>

        </div>

    );

}