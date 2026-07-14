import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

import useAuthStore from "../store/authStore";

import Profile from "../pages/Profile";

export default function AppRoutes() {

    const user = useAuthStore((state) => state.user);

    return (

        <Routes>

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate to="/" replace />
                        : <Login />
                }
            />

            <Route
                path="/profile"
                element={
                    user
                        ? <Profile />
                        : <Navigate to="/login" replace />
                }
            />
            
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}