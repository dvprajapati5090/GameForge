import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import Input from "../ui/Input";
import GradientButton from "../ui/GradientButton";

import useChangePassword from "../../hooks/useChangePassword";
import toast from "react-hot-toast";

export default function ChangePasswordModal({

    open,

    onClose

}) {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const changePasswordMutation = useChangePassword();

    if (!open) return null;

    function handleSubmit() {

        if (!currentPassword || !newPassword || !confirmPassword) {

            toast.error("Please fill all fields.");

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        changePasswordMutation.mutate(

            {

                currentPassword,

                newPassword

            },

            {

                onSuccess: () => {

                    toast.success("Password updated successfully!");

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