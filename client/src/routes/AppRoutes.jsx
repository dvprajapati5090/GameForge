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

import TournamentPage from "../pages/TournamentPage";
import CreateTournamentPage from "../pages/CreateTournamentPage";
import TournamentDetailsPage from "../pages/TournamentDetailsPage";
import HostTournamentsPage from "../pages/HostTournamentsPage";
import HostTournamentDetailsPage from "../pages/HostTournamentDetailsPage";

import HostLayout from "../components/layout/HostLayout";
import HostDashboard from "../pages/HostDashboard";
import LeaderboardPage from "../pages/LeaderboardPage";
import HostBracketPage from "../pages/HostBracketPage";

import HostRoute from "./HostRoute";

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
                    element={
                        user?.role === "HOST"
                            ? <HostDashboard />
                            : <Dashboard />
                    }
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

                <Route

                    path="leaderboard"

                    element={<LeaderboardPage />}

                />

                {/* <Route
                    path="/tournaments"
                    element={<TournamentListPage />}
                />

                <Route
                    path="/tournaments/:id"
                    element={<TournamentDetailsPage />}
                />

                <Route
                    path="/host/create-tournament"
                    element={<CreateTournamentPage />}
                /> */}

                <Route

                    path="tournaments"

                    element={<TournamentPage />}

                />

                <Route
                    path="tournaments/:id"
                    element={<TournamentDetailsPage />}
                />

            </Route>

            <Route
                element={
                    <ProtectedRoute>

                        <HostRoute>

                            <HostLayout />

                        </HostRoute>

                    </ProtectedRoute>
                }
            >

                <Route
                    path="host"
                    element={<HostDashboard />}
                />

                <Route
                    path="host/tournaments"
                    element={
                        <HostRoute>
                            <HostTournamentsPage />
                        </HostRoute>
                    }
                />

                <Route
                    path="host/tournaments/:id"
                    element={<HostTournamentDetailsPage />}
                />

                <Route

                    path="/host/tournaments/:id/bracket"

                    element={<HostBracketPage />}

                />

                <Route
                    path="host/create-tournament"
                    element={<CreateTournamentPage />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}