import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import TeamPage from "../pages/TeamPage";
import CreateTeamPage from "../pages/CreateTeamPage";
import Login from "../pages/Login";
import RegisterPage from "../pages/RegisterPage";
import PlayersPage from "../pages/PlayersPage";
import PlayerProfilePage from "../pages/PlayerProfilePage";
import SettingsPage from "../pages/SettingsPage";

import useAuthStore from "../store/authStore";

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

                path="/register"

                element={<RegisterPage />}

            />

            <Route
                element={
                    <ProtectedRoute>

                        <MainLayout />

                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={<Dashboard />}
                />

                <Route
                    path="profile"
                    element={<Profile />}
                />

                <Route
                    path="team"
                    element={<TeamPage />}
                />

                <Route
                    path="team/create"
                    element={<CreateTeamPage />}
                />

                <Route 
                    path="players" 
                    element={<PlayersPage />} 
                />

                <Route
                    path="players/:username"
                    element={<PlayerProfilePage />}
                />

                <Route 
                    path="settings" 
                    element={<SettingsPage />} 
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}