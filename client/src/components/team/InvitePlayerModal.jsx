import { useState } from "react";
import { X, UserPlus } from "lucide-react";

import { Loader2 } from "lucide-react";

import useInvitePlayer from "../../hooks/useInvitePlayer";

export default function InvitePlayerModal({

    open,

    onClose

}) {

    const [username, setUsername] = useState("");

    const inviteMutation = useInvitePlayer();

    if (!open)
        return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        inviteMutation.mutate(username.trim(), {

            onSuccess: () => {

                setUsername("");

                onClose();

            }

        });

    };

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                backdrop-blur-sm
            "
        >

            <div
                className="
                    relative
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-white/10
                    bg-gradient-to-br
                    from-slate-900
                    via-slate-900
                    to-[#132238]
                    p-8
                "
            >

                <button

                    onClick={onClose}

                    className="
                        absolute
                        top-5
                        right-5
                        text-gray-400
                        hover:text-white
                    "

                >

                    <X size={22} />

                </button>

                <div className="flex items-center gap-3">

                    <UserPlus
                        className="text-cyan-400"
                    />

                    <h2
                        className="
                            text-3xl
                            font-black
                        "
                    >

                        Invite Player

                    </h2>

                </div>

                <p
                    className="
                        mt-3
                        text-gray-400
                    "
                >

                    Invite teammates using their username.

                </p>

                <form

                    onSubmit={handleSubmit}

                    className="mt-8"

                >

                    <label
                        className="
                            text-sm
                            text-gray-400
                        "
                    >

                        Username

                    </label>

                    <input

                        value={username}

                        onChange={(e) =>
                            setUsername(e.target.value)
                        }

                        placeholder="Enter username"

                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-slate-800
                            px-4
                            py-3
                            outline-none
                            focus:border-cyan-500
                        "

                    />

                    <div
                        className="
                            mt-2
                            flex
                            justify-end
                            text-xs
                            text-gray-500
                        "
                    >

                        {username.length}/20

                    </div>

                    <div
                        className="
                            mt-8
                            flex
                            justify-end
                            gap-4
                        "
                    >

                        <button

                            type="button"

                            onClick={() => {

                                setUsername("");

                                onClose();

                            }}

                            className="
                                rounded-xl
                                border
                                border-white/10
                                px-5
                                py-3
                            "

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={

                                inviteMutation.isPending ||

                                !username.trim()

                            }

                            className="
                                rounded-xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-purple-600
                                px-6
                                py-3
                                font-semibold
                                transition-all
                                duration-300
                                hover:scale-105
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                disabled:hover:scale-100
                                flex
                                items-center
                                justify-center
                                gap-2
                            "

                        >

                            {

                                inviteMutation.isPending ? (

                                    <>

                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />

                                        Inviting...

                                    </>

                                ) : (

                                    "Invite Player"

                                )

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}