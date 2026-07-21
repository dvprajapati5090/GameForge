import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function StepBasicInfo({

    form,

    setForm,

    next

}) {

    const update = (field, value) =>
        setForm(prev => ({
            ...prev,
            [field]: value
        }));

    return (

        <div className="space-y-6">

            <Input
                placeholder="Tournament Name"
                value={form.name}
                onChange={e => update("name", e.target.value)}
            />

            <select
                value={form.game}
                onChange={e => update("game", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
            >
                <option>VALORANT</option>
                <option>BGMI</option>
                <option>FREE_FIRE</option>
            </select>

            <select
                value={form.mode}
                onChange={e => update("mode", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
            >
                <option>SOLO</option>
                <option>DUO</option>
                <option>SQUAD</option>
                <option>5V5</option>
            </select>

            <select
                value={form.format}
                onChange={e => update("format", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
            >
                <option>SINGLE_ELIMINATION</option>
            </select>

            <label className="block space-y-2 text-sm font-medium text-slate-200">
                <span>Maximum teams</span>
                <select
                    value={form.maxTeams}
                    onChange={e => update("maxTeams", Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                >
                    {[4, 8, 16, 32, 64, 128].map(team => (
                        <option key={team} value={team}>{team} teams</option>
                    ))}
                </select>
            </label>

            <Button onClick={next}>
                Continue
            </Button>

        </div>

    );

}
