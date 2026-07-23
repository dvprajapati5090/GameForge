import { useState, useRef } from "react";

import GradientButton from "../ui/GradientButton";

import useCreateTeam from "../../hooks/useCreateTeam";

export default function CreateTeamForm() {

    const createMutation = useCreateTeam();

    const [form, setForm] = useState({

        name: "",

        description: "",

        logo: null

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    
    const newErrors = {};

    const [logoFile, setLogoFile] = useState(null);

    const fileInputRef = useRef(null);

    const validate = () => {

    if (form.name.trim().length < 3) {

        newErrors.name =
            "Team name must be at least 3 characters.";

    }

    if (form.name.trim().length > 30) {

        newErrors.name =
            "Team name cannot exceed 30 characters.";

    }

    if (form.description.length > 300) {

        newErrors.description =
            "Description cannot exceed 300 characters.";

    }

    setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate())
            return;

        const formData = new FormData();

        formData.append("name", form.name);

        formData.append("description", form.description);

        if (logoFile) {

            formData.append("logo", logoFile);

        }

        createMutation.mutate(formData);

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="space-y-8"

        >

            <div>

                <label className="block mb-3 font-semibold">

                    Team Logo

                </label>

                <div className="flex items-center gap-5">

                    <img

                        src={
                            logoFile
                                ? URL.createObjectURL(logoFile)
                                : "https://placehold.co/120x120?text=Logo"
                        }

                        alt="Logo"

                        className="
                            h-24
                            w-24
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
                                px-5
                                py-3
                                rounded-xl
                                bg-cyan-600
                                hover:bg-cyan-500
                            "

                        >

                            Choose Logo

                        </button>

                        <input

                            ref={fileInputRef}

                            type="file"

                            hidden

                            accept="image/*"

                            onChange={(e) => {

                                if (e.target.files[0]) {

                                    setLogoFile(e.target.files[0]);

                                }

                            }}

                        />

                    </div>

                </div>

            </div>

            <div>

                <label
                    className="
                        block
                        mb-3
                        font-semibold
                    "
                >

                    Team Name

                </label>

                <input

                    type="text"

                    name="name"

                    value={form.name}

                    onChange={handleChange}

                    maxLength={30}

                    placeholder="Shadow Hunters"

                    className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-900
                        px-5
                        py-4
                        outline-none
                        focus:border-cyan-400
                        transition
                    "

                />

                {
                    errors.name && (

                        <p
                            className="
                                mt-2
                                text-sm
                                text-red-400
                            "
                        >

                            {errors.name}

                        </p>

                    )
                }

                <div
                    className="
                        mt-2
                        text-right
                        text-sm
                        text-gray-500
                    "
                >

                    {form.name.length}/30

                </div>

            </div>

            <div>

                <label
                    className="
                        block
                        mb-3
                        font-semibold
                    "
                >

                    Description

                </label>

                <textarea

                    rows={6}

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                    maxLength={300}

                    placeholder="Tell everyone about your team..."

                    className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-900
                        px-5
                        py-4
                        outline-none
                        resize-none
                        focus:border-cyan-400
                        transition
                    "

                />

                {
                    errors.description && (

                        <p
                            className="
                                mt-2
                                text-sm
                                text-red-400
                            "
                        >

                            {errors.description}

                        </p>

                    )
                }

                <div
                    className="
                        mt-2
                        text-right
                        text-sm
                        text-gray-500
                    "
                >

                    {form.description.length}/300

                </div>

            </div>

            <GradientButton

                type="submit"

                disabled={createMutation.isPending}

                className="
                    w-full
                    py-4
                    text-lg
                "

            >

                {

                    createMutation.isPending

                        ? "Creating Team..."

                        : "Create Team"

                }

            </GradientButton>

        </form>

    );

}