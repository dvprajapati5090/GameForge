import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, Trophy } from "lucide-react";

import GradientButton from "../ui/GradientButton";
import SettingsSection from "./SettingsSection";

export default function ProfileSettingsCard() {
    const navigate = useNavigate();

    return (
        <SettingsSection
            title="Profile"
            description="Manage your display name, bio, Riot account and gaming information."
        >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* Left Side */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15">
                                <User size={20} className="text-cyan-300" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Profile
                                </p>

                                <p className="mt-1 font-semibold text-white">
                                    Complete
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
                                <ShieldCheck
                                    size={20}
                                    className="text-violet-300"
                                />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Riot Account
                                </p>

                                <p className="mt-1 font-semibold text-emerald-400">
                                    Connected
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15">
                                <Trophy
                                    size={20}
                                    className="text-amber-300"
                                />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Status
                                </p>

                                <p className="mt-1 font-semibold text-white">
                                    Active Player
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side */}

                <div className="flex justify-end lg:justify-start">
                    <GradientButton
                        onClick={() => navigate("/profile")}
                    >
                        Open Profile
                    </GradientButton>
                </div>

            </div>
        </SettingsSection>
    );
}