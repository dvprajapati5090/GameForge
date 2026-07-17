import { useNavigate } from "react-router-dom";

import GradientButton from "../ui/GradientButton";

import SettingsSection from "./SettingsSection";

export default function ProfileSettingsCard() {

    const navigate = useNavigate();

    return (

        <SettingsSection

            title="Profile"

            description="Manage your display name, bio, Riot account and gaming information."

        >

            <div className="flex justify-end">

                <GradientButton

                    onClick={() => navigate("/profile")}

                >

                    Open Profile

                </GradientButton>

            </div>

        </SettingsSection>

    );

}