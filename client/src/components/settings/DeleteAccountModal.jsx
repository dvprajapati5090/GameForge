import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert, X } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

import Input from "../ui/Input";
import GradientButton from "../ui/GradientButton";

import useDeleteAccount from "../../hooks/useDeleteAccount";

export default function DeleteAccountModal({

    open,

    onClose

}) {

    if (!open) return null;

    const [password, setPassword] = useState("");

    const [confirmation, setConfirmation] = useState("");

    const deleteMutation = useDeleteAccount();

    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    function handleDelete() {

        if (!password.trim()) {

            toast.error("Password is required.");

            return;

        }

        if (confirmation !== "DELETE") {

            toast.error("Type DELETE to continue.");

            return;

        }

        deleteMutation.mutate(

            {

                password

            },

            {

                onSuccess: () => {

                    logout();

                    onClose();

                    navigate(

                        "/login",

                        {

                            replace: true,

                            state: {

                                success:

                                    "Account deleted successfully."

                            }

                        }

                    );

                },

                onError: (error) => {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to delete account."

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
                    bg-black/60
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    z-50
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

                    onClick={(e) => e.stopPropagation()}

                    className="
                        w-full
                        max-w-lg
                        rounded-3xl
                        bg-slate-900
                        border
                        border-red-500/30
                        p-8
                    "

                >

                    <div className="space-y-6 mb-10">

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <Input
                            label='Type "DELETE" to confirm'
                            value={confirmation}
                            onChange={(e) =>
                                setConfirmation(e.target.value)
                            }
                        />

                    </div>

                    <div className="flex justify-between items-center mb-6">

                        <div className="flex items-center gap-4 mb-6">

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-red-500/10
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <TriangleAlert
                                    size={28}
                                    className="text-red-500"
                                />
                            </div>

                            <div>

                                <h2 className="text-3xl font-bold">

                                    Delete Account

                                </h2>

                                <p className="text-sm text-gray-400 mt-1">

                                    This action cannot be undone.

                                </p>

                            </div>

                        </div>

                        <button

                            onClick={onClose}

                        >

                            <X size={22} />

                        </button>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/5
                            p-5
                            mb-8
                        "
                    >

                        <p className="text-gray-300 mb-4">

                            Deleting your account will permanently remove:

                        </p>

                        <ul className="space-y-2 text-gray-400">

                            <li>• Your profile</li>

                            <li>• Your team and memberships</li>

                            <li>• Tournament registrations</li>

                            <li>• Match history</li>

                            <li>• All GameForge data</li>

                        </ul>

                    </div>

                    <div
                        className="
                            flex
                            justify-end
                            gap-4
                            pt-6
                            border-t
                            border-white/10
                        "
                    >

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

                        <button

                            onClick={handleDelete}

                            disabled={
                                deleteMutation.isPending ||
                                confirmation !== "DELETE"
                            }

                            className="
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                text-white
                                bg-gradient-to-r
                                from-red-600
                                to-red-500
                                hover:scale-105
                                transition-all
                                disabled:opacity-50
                                disabled:hover:scale-100
                            "

                        >

                            {

                                deleteMutation.isPending

                                    ? "Deleting..."

                                    : "Delete Account"

                            }

                        </button>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}