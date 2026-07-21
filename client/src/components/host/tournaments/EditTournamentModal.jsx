import { useState, useEffect } from "react";

import Button from "../../ui/Button";

export default function EditTournamentModal({

    tournament,

    open,

    onClose,

    onSave

}) {

    const [form, setForm] = useState({

        name: "",

        description: "",

        prizePool: 0,

        maxTeams: 2,

        rules: ""

    });

    useEffect(() => {

        if (tournament) {

            setForm({

                name: tournament.name,

                description: tournament.description,

                prizePool: tournament.prizePool,

                maxTeams: tournament.maxTeams,

                rules: tournament.rules

            });

        }

    }, [tournament]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-900 w-full max-w-xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Edit Tournament

                </h2>

                <div className="space-y-4">

                    <input

                        className="w-full p-3 rounded bg-slate-800"

                        value={form.name}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                name:e.target.value

                            })

                        }

                    />

                    <textarea

                        className="w-full p-3 rounded bg-slate-800"

                        value={form.description}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                description:e.target.value

                            })

                        }

                    />

                    <input

                        type="number"

                        className="w-full p-3 rounded bg-slate-800"

                        value={form.prizePool}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                prizePool:Number(e.target.value)

                            })

                        }

                    />

                    <input
                        type="number"
                        className="w-full p-3 rounded bg-slate-800 disabled:opacity-50"
                        value={form.maxTeams}
                        disabled={new Date() >= new Date(tournament.registrationStart)}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                maxTeams:Number(e.target.value)
                            })
                        }
                    />

                    <textarea

                        className="w-full p-3 rounded bg-slate-800"

                        value={form.rules}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                rules:e.target.value

                            })

                        }

                    />

                </div>

                <div className="flex justify-end gap-4 mt-8">

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

                            // Only send maxTeams if it was actually changed
                            if (form.maxTeams !== tournament.maxTeams) {
                                payload.maxTeams = form.maxTeams;
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