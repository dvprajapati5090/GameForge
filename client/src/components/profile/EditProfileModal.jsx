import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import useAuthStore from "../../store/authStore";

import useUpdateProfile from "../../hooks/useUpdateProfile";

export default function EditProfileModal({
    open,
    onClose
}) {

    const games = [
        "Valorant",
        "CS2",
        "BGMI",
        "Rocket League",
        "Apex Legends",
        "League of Legends"
    ];

    const toggleGame = (game) => {

        if (selectedGames.includes(game)) {

            setSelectedGames(
                selectedGames.filter((g) => g !== game)
            );

        } else {

            setSelectedGames([
                ...selectedGames,
                game
            ]);

        }

    };

    const user = useAuthStore((state) => state.user);

    const [displayName, setDisplayName] = useState(
        user?.displayName || ""
    );

    const [bio, setBio] = useState(
        user?.bio || ""
    );
    
    const [selectedGames, setSelectedGames] = useState(
        user?.favoriteGames || []
    );

    const [avatarFile, setAvatarFile] = useState(null);

    const fileInputRef = useRef(null);

    const updateProfileMutation = useUpdateProfile();

    useEffect(() => {

        if (open) {

            setDisplayName(user?.displayName || "");

            setBio(user?.bio || "");

            setSelectedGames(user?.favoriteGames || []);

            setAvatarFile(null);

        }

    }, [open, user]);

    if (!open) return null;

    return (

        <AnimatePresence>

            <motion.div

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}

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

                onClick={onClose}
            >

                <motion.div

                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 40
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}

                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: 40
                    }}

                    transition={{
                        duration: 0.3
                    }}

                    onClick={(e) => e.stopPropagation()}

                    className="
                        w-full
                        max-w-2xl

                        rounded-3xl

                        border
                        border-white/10

                        bg-slate-900

                        p-8

                        shadow-[0_0_80px_rgba(59,130,246,0.25)]
                    "
                >

                    <div className="flex justify-between items-center mb-8">

                        <h2 className="text-3xl font-bold">

                            Edit Profile

                        </h2>

                        <button
                            onClick={onClose}
                            className="
                                p-2
                                rounded-lg
                                hover:bg-white/10
                            "
                        >

                            <X size={24} />

                        </button>

                    </div>

                    <div className="space-y-6">

                        <div>

                            <div>

                                <label className="text-gray-300">

                                    Avatar

                                </label>

                                <div className="flex items-center gap-5 mt-3">

                                    <img
                                        src={
                                            avatarFile
                                                ? URL.createObjectURL(avatarFile)
                                                : user?.avatar ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    user?.displayName || "User"
                                                )}&background=1e293b&color=fff`
                                        }
                                        alt="avatar"
                                        className="
                                            h-20
                                            w-20
                                            rounded-full
                                            object-cover
                                            border
                                            border-cyan-500
                                        "
                                    />

                                    <div>

                                        <button

                                            type="button"

                                            onClick={() => fileInputRef.current.click()}

                                            className="
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-cyan-600
                                                hover:bg-cyan-500
                                            "

                                        >

                                            Choose Image

                                        </button>

                                        <input

                                            ref={fileInputRef}

                                            type="file"

                                            accept="image/*"

                                            hidden

                                            onChange={(e) => {

                                                if (e.target.files[0]) {

                                                    setAvatarFile(

                                                        e.target.files[0]

                                                    );

                                                }

                                            }}

                                        />

                                    </div>

                                </div>

                            </div>

                            <label className="text-gray-300">

                                Display Name

                            </label>

                            <input
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="
                                    mt-2
                                    w-full
                                    rounded-xl
                                    bg-slate-800
                                    border
                                    border-slate-700
                                    p-4
                                    text-white
                                    outline-none
                                    focus:border-cyan-400
                                "
                                placeholder="Display Name"
                            />

                        </div>

                        <div>

                            <label className="text-gray-300">

                                Bio

                            </label>

                            <textarea
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="
                                    mt-2
                                    w-full
                                    rounded-xl
                                    bg-slate-800
                                    border
                                    border-slate-700
                                    p-4
                                    text-white
                                    resize-none
                                    outline-none
                                    focus:border-cyan-400
                                "
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div>

                            <label className="text-gray-300 font-medium">

                                Favourite Games

                            </label>

                            <div className="flex flex-wrap gap-3 mt-4">

                                {games.map((game) => (

                                    <button

                                        key={game}

                                        type="button"

                                        onClick={() => toggleGame(game)}

                                        className={`
                                            px-5
                                            py-2
                                            rounded-full
                                            border
                                            transition-all
                                            duration-300

                                            ${
                                                selectedGames.includes(game)

                                                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white"

                                                    : "bg-slate-800 border-slate-700 text-gray-300 hover:border-cyan-500"
                                            }
                                        `}
                                    >

                                        {game}

                                    </button>

                                ))}

                            </div>

                        </div>

                        <div className="flex justify-end gap-4 pt-4">

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

                                onClick={() => {

                                    console.log({
                                        displayName,
                                        bio,
                                        favoriteGames: selectedGames
                                    });

                                    const formData = new FormData();

                                    formData.append(
                                        "displayName",
                                        displayName
                                    );

                                    formData.append(
                                        "bio",
                                        bio
                                    );

                                    formData.append(
                                        "favoriteGames",
                                        JSON.stringify(selectedGames)
                                    );

                                    if (avatarFile) {

                                        formData.append(
                                            "avatar",
                                            avatarFile
                                        );

                                    }

                                    updateProfileMutation.mutate(

                                        formData,

                                        {

                                            onSuccess: () => {

                                                onClose();

                                            }

                                        }

                                    );

                                }}

                                disabled={updateProfileMutation.isPending}

                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-cyan-500
                                    hover:scale-105
                                    transition
                                    disabled:opacity-50
                                "

                            >

                                {

                                    updateProfileMutation.isPending

                                        ? "Saving..."

                                        : "Save Changes"

                                }

                            </button>
                        </div>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}