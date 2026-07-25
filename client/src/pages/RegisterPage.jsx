import Background from "../components/auth/Background";
import RegisterWizard from "../components/register/RegisterWizard";

export default function RegisterPage() {

    return (

        <>

            <Background />

            <main
                className="
                    relative
                    z-10

                    min-h-screen

                    flex
                    items-center
                    justify-center

                    px-6
                    py-6
                "
            >

                <div
                    className="
                        w-full
                        max-w-6xl

                        flex
                        items-center
                        justify-center
                    "
                >

                    <RegisterWizard />

                </div>

            </main>

        </>

    );

}