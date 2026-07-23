import Background from "../components/auth/Background";
import RegisterWizard from "../components/register/RegisterWizard";
import { useLocation } from "react-router-dom";

export default function RegisterPage() {

    const location = useLocation();
    const googleData = location.state?.googleData;

    return (
        <>
            <Background />

            <div
                className="
                    relative
                    z-10
                    min-h-screen
                    flex
                    justify-center
                    items-start
                    px-6
                    py-8
                "
            >
                <RegisterWizard
                    googleData={googleData}
                />
            </div>
        </>
    );
}