import { useState } from "react";
import {
    AlertTriangle,
    ShieldAlert,
    Database,
    Trash2
} from "lucide-react";

import SettingsSection from "./SettingsSection";
import GradientButton from "../ui/GradientButton";

import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountSettingsCard() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <SettingsSection
                title="Account"
                description="Manage your account lifecycle. Deleting your account is permanent and cannot be undone."
            >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left Side */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15">

                                    <ShieldAlert
                                        size={20}
                                        className="text-amber-300"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Account
                                    </p>

                                    <p className="mt-1 font-semibold text-white">
                                        Active
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15">

                                    <Database
                                        size={20}
                                        className="text-cyan-300"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Data
                                    </p>

                                    <p className="mt-1 font-semibold text-white">
                                        Stored Securely
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15">

                                    <AlertTriangle
                                        size={20}
                                        className="text-red-400"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Warning
                                    </p>

                                    <p className="mt-1 font-semibold text-red-300">
                                        Permanent Action
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="flex justify-end">

                        <GradientButton
                            onClick={() => setOpen(true)}
                            className="
                                !bg-gradient-to-r
                                !from-red-600
                                !via-red-500
                                !to-rose-500
                                hover:!shadow-red-500/40
                            "
                        >
                            <Trash2 size={18} />

                            Delete Account
                        </GradientButton>

                    </div>

                </div>
            </SettingsSection>

            <DeleteAccountModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );

}