import Button from "../../ui/Button";

export default function DeleteTournamentModal({

    open,
    onClose,
    onDelete

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

            <div className="bg-slate-900 rounded-2xl p-8 w-[420px]">

                <h2 className="text-2xl font-bold">

                    Delete Tournament?

                </h2>

                <p className="mt-4 text-gray-400">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <Button
                        onClick={onClose}
                    >

                        Cancel

                    </Button>

                    <Button
                        variant="danger"
                        onClick={onDelete}
                    >

                        Delete

                    </Button>

                </div>

            </div>

        </div>

    );

}