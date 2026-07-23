import { useState, useEffect, useRef } from "react";
import Button from "../../ui/Button";

export default function EditTournamentModal({
    tournament,
    open,
    onClose,
    onSave
}) {
    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: "",
        prizePool: 0,
        maxTeams: 2,
        rules: "",
        banner: null
    });

    useEffect(() => {
        if (tournament) {
            setForm({
                name: tournament.name,
                description: tournament.description,
                prizePool: tournament.prizePool,
                maxTeams: tournament.maxTeams,
                rules: tournament.rules,
                banner: null
            });

            setPreview(tournament.banner || "");
        }
    }, [tournament]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-slate-900 w-full max-w-xl rounded-2xl p-8">

                <h2 className="mb-6 text-3xl font-bold">
                    Edit Tournament
                </h2>

                <div className="space-y-5">

                    {/* Banner */}

                    <div>
                        <label className="block mb-2 font-semibold">
                            Tournament Banner
                        </label>

                        <img
                            src={
                                preview ||
                                "https://placehold.co/1200x500?text=Tournament+Banner"
                            }
                            alt="Banner"
                            className="h-40 w-full rounded-xl border border-cyan-500 object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="mt-3 rounded-lg bg-cyan-600 px-4 py-2 hover:bg-cyan-500"
                        >
                            Change Banner
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (!file) return;

                                setPreview(URL.createObjectURL(file));

                                setForm((prev) => ({
                                    ...prev,
                                    banner: file
                                }));
                            }}
                        />
                    </div>

                    <input
                        className="w-full rounded bg-slate-800 p-3"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />

                    <textarea
                        className="w-full rounded bg-slate-800 p-3"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        className="w-full rounded bg-slate-800 p-3"
                        value={form.prizePool}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                prizePool: Number(e.target.value)
                            })
                        }
                    />

                    <input
                        type="number"
                        className="w-full rounded bg-slate-800 p-3 disabled:opacity-50"
                        value={form.maxTeams}
                        disabled={
                            new Date() >=
                            new Date(tournament.registrationStart)
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                maxTeams: Number(e.target.value)
                            })
                        }
                    />

                    <textarea
                        className="w-full rounded bg-slate-800 p-3"
                        value={form.rules}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                rules: e.target.value
                            })
                        }
                    />

                </div>

                <div className="mt-8 flex justify-end gap-4">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={() => {

                            const payload = {
                                name: form.name,
                                description: form.description,
                                prizePool: form.prizePool,
                                rules: form.rules
                            };

                            if (
                                form.maxTeams !== tournament.maxTeams
                            ) {
                                payload.maxTeams = form.maxTeams;
                            }

                            if (form.banner) {
                                payload.banner = form.banner;
                            }

                            onSave(payload);
                        }}
                    >
                        Save Changes
                    </Button>

                </div>

            </div>
        </div>
    );
}