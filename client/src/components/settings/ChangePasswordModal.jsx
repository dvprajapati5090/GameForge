import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import Input from "../ui/Input";
import GradientButton from "../ui/GradientButton";

import useChangePassword from "../../hooks/useChangePassword";
import toast from "react-hot-toast";

import useAuthStore from "../../store/authStore";

export default function ChangePasswordModal({

    open,

    onClose

}) {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const changePasswordMutation = useChangePassword();

    const user = useAuthStore((state) => state.user);

    const isGoogleOnly =

        user?.authProviders?.includes("GOOGLE") &&

        !user?.authProviders?.includes("LOCAL");


    if (!open) return null;

    if (isGoogleOnly) {

        return (

            <AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        backdrop-blur-sm
                    "
                >

                    <motion.div

                        initial={{
                            opacity: 0,
                            scale: 0.9
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1
                        }}

                        exit={{
                            opacity: 0,
                            scale: 0.9
                        }}

                        onClick={(e) => e.stopPropagation()}

                        className="
                            w-full
                            max-w-lg
                            rounded-3xl
                            bg-slate-900
                            border
                            border-white/10
                            p-8
                        "

                    >

                        <h2 className="text-3xl font-bold">

                            Password Managed by Google

                        </h2>

                        <p className="mt-6 text-gray-400 leading-7">

                            This GameForge account uses Google Sign-In.

                            Password changes must be made from your Google Account.

                        </p>

                        <div className="mt-8 flex justify-end">

                            <GradientButton
                                onClick={onClose}
                            >

                                Close

                            </GradientButton>

                        </div>

                    </motion.div>

                </motion.div>

            </AnimatePresence>

        );

    }


    if (!open) return null;

    function handleSubmit() {

        if (!currentPassword.trim()) {

            toast.error("Current password is required.");

            return;

        }

        if (!newPassword.trim()) {

            toast.error("New password is required.");

            return;

        }

        if (newPassword.length < 8) {

            toast.error("Password must be at least 8 characters.");

            return;

        }

        if (!/[A-Z]/.test(newPassword)) {

            toast.error("Password must contain an uppercase letter.");

            return;

        }

        if (!/[a-z]/.test(newPassword)) {

            toast.error("Password must contain a lowercase letter.");

            return;

        }

        if (!/\d/.test(newPassword)) {

            toast.error("Password must contain a number.");

            return;

        }

        if (!confirmPassword.trim()) {

            toast.error("Please confirm your password.");

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        if (currentPassword === newPassword) {

            toast.error("New password cannot be the same as the current password.");

            return;

        }

        changePasswordMutation.mutate(

            {

                currentPassword,

                newPassword

            },

            {

                onSuccess: () => {

                    toast.success("Password updated successfully.");

                    setCurrentPassword("");

                    setNewPassword("");

                    setConfirmPassword("");

                    onClose();

                },

                onError: (error) => {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to update password."

                    );

                }

            }

        );

    }

    return (

        <AnimatePresence>

            <motion.div

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                exit={{ opacity: 0 }}

                onClick={onClose}

                className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/60
                    backdrop-blur-sm
                "

            >

                <motion.div

                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 30
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}

                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: 30
                    }}

                    transition={{
                        duration: 0.3
                    }}

                    onClick={(e) => e.stopPropagation()}

                    className="
                        w-full
                        max-w-xl
                        rounded-3xl
                        border
                        border-white/10
                        bg-slate-900
                        p-8
                    "

                >

                    <div className="flex justify-between items-center mb-8">

                        <h2 className="text-3xl font-bold">

                            Change Password

                        </h2>

                        <button

                            onClick={onClose}

                            className="
                                p-2
                                rounded-lg
                                hover:bg-white/10
                            "

                        >

                            <X size={22} />

                        </button>

                    </div>

                    <div className="space-y-6">

                        <Input

                            label="Current Password"

                            type="password"

                            value={currentPassword}

                            onChange={(e) =>

                                setCurrentPassword(e.target.value)

                            }

                        />

                        <Input

                            label="New Password"

                            type="password"

                            value={newPassword}

                            onChange={(e) =>

                                setNewPassword(e.target.value)

                            }

                        />

                        <Input

                            label="Confirm Password"

                            type="password"

                            value={confirmPassword}

                            onChange={(e) =>

                                setConfirmPassword(e.target.value)

                            }

                        />

                        <div className="flex justify-end gap-4">

                            <button

                                onClick={onClose}

                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-slate-700
                                    hover:bg-slate-600
                                    transition
                                "

                            >

                                Cancel

                            </button>

                            <GradientButton

                                onClick={handleSubmit}

                                disabled={changePasswordMutation.isPending}

                            >

                                {

                                    changePasswordMutation.isPending

                                        ? "Updating..."

                                        : "Update Password"

                                }

                            </GradientButton>

                        </div>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}