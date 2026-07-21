import Button from "../../ui/Button";

import useCreateTournament from "../../../hooks/useCreateTournament";

export default function StepReview({

    form,

    previous

}) {

    const mutation = useCreateTournament();

    return (

        <div className="space-y-6">

            <pre
                className="
                    bg-white/5
                    rounded-xl
                    p-6
                    overflow-auto
                "
            >
                {JSON.stringify(form, null, 2)}
            </pre>

            <div className="flex justify-between">

                <Button
                    variant="secondary"
                    onClick={previous}
                >
                    Back
                </Button>

                <Button
                    
                    loading={mutation.isPending}
                    
                    onClick={() => {

                        mutation.mutate({
                    
                            ...form,
                    
                            registrationStart: new Date(
                                form.registrationStart
                            ).toISOString(),
                    
                            registrationEnd: new Date(
                                form.registrationEnd
                            ).toISOString(),
                    
                            tournamentStart: new Date(
                                form.tournamentStart
                            ).toISOString()
                    
                        });
                    
                    }}
                >
                    Create Tournament
                </Button>

            </div>

        </div>

    );

}
