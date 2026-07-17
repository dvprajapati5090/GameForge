import { useState } from "react";

import SettingsSection from "./SettingsSection";
import GradientButton from "../ui/GradientButton";

import ChangePasswordModal from "./ChangePasswordModal";

export default function SecuritySettingsCard() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <SettingsSection

                title="Security"

                description="Keep your account secure by updating your password."

            >

                <div className="flex justify-end">

                    <GradientButton

                        onClick={() => setOpen(true)}

                    >

                        Change Password

                    </GradientButton>

                </div>

            </SettingsSection>

            <ChangePasswordModal

                open={open}

                onClose={() => setOpen(false)}

            />

        </>

    );

}