import { useState } from "react";
import useTransferCaptain from "../../hooks/useTransferCaptain";

export default function TransferCaptainModal({

    open,

    onClose,

    team

}) {

    const [memberId, setMemberId] = useState("");

    const transferMutation = useTransferCaptain();

    if (!open) return null;

    const members = team.members.filter(

        member => member._id !== team.captain._id

    );

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!memberId) return;

        transferMutation.mutate(

            memberId,

            {

                onSuccess: () => {

                    onClose();

                }

            }

        );

    };

    return (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-slate-900 rounded-3xl border border-white/10 w-full max-w-lg p-8">

                <h2 className="text-3xl font-black">

                    Transfer Captain

                </h2>

                <p className="text-gray-400 mt-2">

                    Select the new captain.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >

                    {

                        members.map((member) => (

                            <label

                                key={member._id}

                                className="flex items-center gap-3 rounded-xl border border-white/10 p-4 cursor-pointer hover:border-cyan-500"

                            >

                                <input

                                    type="radio"

                                    value={member._id}

                                    checked={memberId === member._id}

                                    onChange={(e) =>

                                        setMemberId(e.target.value)

                                    }

                                />

                                <div>

                                    <h3 className="font-bold">

                                        {member.displayName}

                                    </h3>

                                    <p className="text-gray-400">

                                        @{member.username}

                                    </p>

                                </div>

                            </label>

                        ))

                    }

                    <div className="flex justify-end gap-4 pt-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-5 py-3 rounded-xl bg-white/10"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold"

                        >

                            Transfer

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}