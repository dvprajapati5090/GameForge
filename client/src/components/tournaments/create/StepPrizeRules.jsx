import Button from "../../ui/Button";

export default function StepPrizeRules({

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
                type="number"
                placeholder="Prize Pool"
                value={form.prizePool}
                onChange={e => update("prizePool", Number(e.target.value))}
                className="w-full rounded-xl p-3 bg-white/5"
            />

            <textarea
                rows="6"
                placeholder="Tournament Rules"
                value={form.rules}
                onChange={e => update("rules", e.target.value)}
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
