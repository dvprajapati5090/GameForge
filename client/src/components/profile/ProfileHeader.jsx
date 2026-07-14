import { Pencil } from "lucide-react";
import useAuthStore from "../../store/authStore";

import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeader() {

    const user = useAuthStore((state) => state.user);

    const [open, setOpen] = useState(false);

    return (

        <>

            <div
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-8
                "
            >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                    <div className="flex items-center gap-6">

                        <div
                            className="
                                w-28
                                h-28
                                rounded-full
                                bg-gradient-to-r
                                from-purple-500
                                to-cyan-400
                                flex
                                items-center
                                justify-center
                                text-4xl
                                font-bold
                            "
                        >
                            {user?.displayName?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>

                            <h1 className="text-4xl font-black">

                                {user?.displayName}

                            </h1>

                            <p className="text-gray-400 mt-2">

                                {user?.email}

                            </p>

                            <p className="text-cyan-400 mt-3">

                                Member since 2026

                            </p>


                        </div>

                    </div>

                    <button
                        className="
                            flex
                            items-center
                            gap-3
                            px-6
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-purple-600
                            to-cyan-500
                            hover:scale-105
                            transition
                        "
                        onClick={() => setOpen(true)}
                    >

                        <Pencil size={18} />

                        Edit Profile

                    </button>

                </div>

            </div>

            <EditProfileModal

                open={open}

                onClose={() => setOpen(false)}

            />

        </>

    );

}