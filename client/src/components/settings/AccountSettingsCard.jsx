import { useState } from "react";

import SettingsSection from "./SettingsSection";
import GradientButton from "../ui/GradientButton";

import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountSettingsCard() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <SettingsSection

                title="Account"

                description="Permanently delete your GameForge account."

            >

                <div className="flex justify-end">

                    <GradientButton

                        onClick={() => setOpen(true)}

                        className="bg-red-600 hover:bg-red-700"

                    >

                        Delete Account

                    </GradientButton>

                </div>

            </SettingsSection>

            <DeleteAccountModal

                open={open}

                onClose={() => setOpen(false)}

            />

        </>

    );

}