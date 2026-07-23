import { useEffect, useState, useRef } from "react";

import useUpdateTeam from "../../hooks/useUpdateTeam";

export default function EditTeamModal({

    open,

    onClose,

    team

}) {

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const updateMutation = useUpdateTeam();

    const [logoFile, setLogoFile] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {

        if(team){

            setName(team.name);

            setDescription(team.description || "");

            setLogoFile(null);

        }

    },[team,open]);

    if (!open) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);

        formData.append("description", description);

        if (logoFile) {

            formData.append("logo", logoFile);

        }

        updateMutation.mutate(

            formData,

            {

                onSuccess: () => onClose()

            }

        );

    };

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/70
                backdrop-blur-sm
                flex
                items-center
                justify-center
            "
        >

            <div
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

                <h2 className="text-3xl font-black">

                    Edit Team

                </h2>

                <p className="text-gray-400 mt-2">

                    Update your team's information.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >

                    <div>

                        <label className="block mb-3">

                            Team Logo

                        </label>

                        <div className="flex items-center gap-5">

                            <img

                                src={
                                    logoFile
                                        ? URL.createObjectURL(logoFile)
                                        : team?.logo
                                }

                                alt="logo"

                                className="
                                    h-24
                                    w-24
                                    rounded-full
                                    object-cover
                                    border
                                    border-cyan-500
                                "

                            />

                            <button

                                type="button"

                                onClick={() => fileInputRef.current.click()}

                                className="
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-cyan-600
                                "

                            >

                                Change Logo

                            </button>

                            <input

                                hidden

                                ref={fileInputRef}

                                type="file"

                                accept="image/*"

                                onChange={(e) => {

                                    if (e.target.files[0]) {

                                        setLogoFile(e.target.files[0]);

                                    }

                                }}

                            />

                        </div>

                    </div>

                    <input

                        value={name}

                        onChange={(e) => setName(e.target.value)}

                        placeholder="Team Name"

                        className="
                            w-full
                            rounded-xl
                            bg-slate-800
                            border
                            border-white/10
                            p-4
                        "

                    />

                    <textarea

                        rows={4}

                        value={description}

                        onChange={(e) =>

                            setDescription(e.target.value)

                        }

                        placeholder="Description"

                        className="
                            w-full
                            rounded-xl
                            bg-slate-800
                            border
                            border-white/10
                            p-4
                        "

                    />

                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-white/10
                            "

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={updateMutation.isPending}

                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-cyan-500
                                text-black
                                font-bold
                            "

                        >

                            {

                                updateMutation.isPending

                                    ? "Saving..."

                                    : "Save Changes"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}