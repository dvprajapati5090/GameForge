import { useState } from "react";

import GradientButton from "../ui/GradientButton";

import useCreateTeam from "../../hooks/useCreateTeam";

export default function CreateTeamForm() {

    const createMutation = useCreateTeam();

    const [form, setForm] = useState({

        name: "",

        description: ""

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const validate = () => {

    const newErrors = {};

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

        createMutation.mutate(form);

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="space-y-8"

        >

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