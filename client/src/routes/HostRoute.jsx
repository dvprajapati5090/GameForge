import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

export default function HostRoute({ children }) {

    const user = useAuthStore((state) => state.user);

    if (!user) {

        return <Navigate to="/login" />;

    }

    if (user.role !== "HOST") {

        return <Navigate to="/" />;

    }

    return children;

}