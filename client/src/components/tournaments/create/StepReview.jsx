import Button from "../../ui/Button";

import useCreateTournament from "../../../hooks/useCreateTournament";

export default function StepReview({

    form,

    previous

}) {


    const mutation = useCreateTournament();



    const validateBeforeCreate = () => {


        if(!form.name.trim()){

            alert("Tournament name is missing.");

            return false;

        }


        if(!form.registrationStart ||
           !form.registrationEnd ||
           !form.tournamentStart
        ){

            alert("Tournament dates are incomplete.");

            return false;

        }



        if(
            form.isPaid &&
            (!form.entryFee || form.entryFee <= 0)
        ){

            alert("Entry fee is required for paid tournaments.");

            return false;

        }



        if(!form.rules.trim()){

            alert("Tournament rules are required.");

            return false;

        }


        return true;

    };








    const createTournament = () => {


        if(!validateBeforeCreate()){

            return;

        }



        mutation.mutate({

            ...form,

            maxTeams:Number(form.maxTeams),

            prizePool:Number(form.prizePool || 0),


            registrationStart:new Date(
                form.registrationStart
            ).toISOString(),


            registrationEnd:new Date(
                form.registrationEnd
            ).toISOString(),


            tournamentStart:new Date(
                form.tournamentStart
            ).toISOString()


        });


    };









    const Card = ({title,value,icon}) => (

        <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-5
        ">


            <div className="
                flex
                items-center
                gap-3
                mb-3
            ">


                <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-black
                    flex
                    items-center
                    justify-center
                ">
                    {icon}
                </div>


                <p className="
                    text-sm
                    text-slate-400
                ">
                    {title}
                </p>


            </div>


            <p className="
                text-white
                font-semibold
            ">
                {value}
            </p>


        </div>

    );







    return (

        <div className="space-y-8">





            {/* Header */}

            <div>

                <h2 className="
                    text-2xl font-bold font-mono
                    text-white
                ">
                    Review Tournament
                </h2>


                <p className="
                    mt-2
                    text-slate-400
                    text-sm
                ">
                    Verify all details before publishing.
                </p>


            </div>









            {/* Main Preview */}

            <div className="
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-r
                from-[#e8003d]/20
                to-black
                p-8
            ">


                <p className="
                    text-sm
                    text-slate-300
                ">
                    Tournament Name
                </p>



                <h1 className="
                    text-3xl font-bold font-mono
                    text-white
                    mt-2
                ">

                    {form.name || "Unnamed Tournament"}

                </h1>


            </div>









            {/* Information Cards */}

            <div className="
                grid
                md:grid-cols-2
                gap-5
            ">


                <Card
                    title="Game"
                    value={form.game}
                    icon="🎮"
                />



                <Card
                    title="Mode"
                    value={form.mode}
                    icon="👥"
                />



                <Card
                    title="Format"
                    value={form.format}
                    icon="🏆"
                />



                <Card
                    title="Teams"
                    value={`${form.maxTeams} Teams`}
                    icon="📋"
                />



                <Card
                    title="Prize Pool"
                    value={`₹${form.prizePool || 0}`}
                    icon="💰"
                />



                <Card
                    title="Entry Type"
                    value={
                        form.isPaid
                        ?
                        `Paid ₹${form.entryFee}`
                        :
                        "Free Tournament"
                    }
                    icon="🎟️"
                />



            </div>









            {/* Rules */}

            <div className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
            ">


                <h3 className="
                    text-white
                    font-semibold
                    mb-3
                ">
                    Tournament Rules
                </h3>



                <p className="
                    text-slate-300
                    text-sm
                    whitespace-pre-line
                ">

                    {
                        form.rules ||
                        "No rules added."
                    }

                </p>


            </div>









            {/* Buttons */}

            <div className="
                flex
                justify-between
                pt-4
            ">



                <Button

                    variant="secondary"

                    onClick={previous}

                >

                    ← Back

                </Button>







                <Button

                    loading={mutation.isPending}

                    onClick={createTournament}

                    className="
                        shadow-[0_0_40px_rgba(232,0,61,0.7)]
                        hover:shadow-[0_0_60px_rgba(232,0,61,0.9)]
                    "

                >

                    Create Tournament 🚀

                </Button>



            </div>





        </div>

    );

}