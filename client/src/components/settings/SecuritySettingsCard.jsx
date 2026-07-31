import { useState } from "react";
import {
    Shield,
    Lock,
    Smartphone,
    MonitorSmartphone
} from "lucide-react";

import SettingsSection from "./SettingsSection";
import GradientButton from "../ui/GradientButton";

import ChangePasswordModal from "./ChangePasswordModal";

export default function SecuritySettingsCard() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <SettingsSection
                title="Security"
                description="Keep your GameForge account protected with strong authentication and password management."
            >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left Side */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">

                                    <Shield
                                        size={20}
                                        className="text-emerald-300"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Account
                                    </p>

                                    <p className="mt-1 font-semibold text-emerald-400">
                                        Protected
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">

                                    <Lock
                                        size={20}
                                        className="text-violet-300"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Password
                                    </p>

                                    <p className="mt-1 font-semibold text-white">
                                        Last Updated
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15">

                                    <MonitorSmartphone
                                        size={20}
                                        className="text-cyan-300"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Sessions
                                    </p>

                                    <p className="mt-1 font-semibold text-white">
                                        1 Active
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="flex justify-end">

                        <GradientButton
                            onClick={() => setOpen(true)}
                        >
                            Change Password
                        </GradientButton>

                    </div>

                </div>
            </SettingsSection>

            <ChangePasswordModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );

}