import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {

    const {

        user,

        authLoading

    } = useAuthStore();

    if (authLoading) {

        return (

            <div className="flex items-center justify-center h-screen">

                Loading...

            </div>

        );

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    return children;

}