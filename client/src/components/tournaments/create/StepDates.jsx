import Button from "../../ui/Button";

export default function StepDates({

    form,

    setForm,

    next,

    previous

}) {

    const update = (field, value) =>
        setForm(prev => ({
            ...prev,
            [field]: value
        }));

    return (

        <div className="space-y-6">

            <input
                type="datetime-local"
                value={form.registrationStart}
                onChange={e => update("registrationStart", e.target.value)}
                className="w-full rounded-xl p-3 bg-white/5"
            />

            <input
                type="datetime-local"
                value={form.registrationEnd}
                onChange={e => update("registrationEnd", e.target.value)}
                className="w-full rounded-xl p-3 bg-white/5"
            />

            <input
                type="datetime-local"
                value={form.tournamentStart}
                onChange={e => update("tournamentStart", e.target.value)}
                className="w-full rounded-xl p-3 bg-white/5"
            />

            <div className="flex justify-between">

                <Button
                    variant="secondary"
                    onClick={previous}
                >
                    Back
                </Button>

                <Button onClick={next}>
                    Continue
                </Button>

            </div>

        </div>

    );

}