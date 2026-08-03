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

import VerifyEmail from "../pages/VerifyEmail";
import LandingPage from "../pages/LandingPage";

import useAuthStore from "../store/authStore";

export default function AppRoutes() {

    const user = useAuthStore((state) => state.user);

    return (

        <Routes>

            {/* Landing Page Route */}
            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate to={user.role === "HOST" ? "/host" : "/dashboard"} replace />
                        : <Login />
                }
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/verify-email/:token"
                element={<VerifyEmail />}
            />

            {/* ══════════════════════════════════════
                PLAYER LAYOUT  (MainLayout + PlayerSidebar)
                All routes here are PLAYER-only paths
                ══════════════════════════════════════ */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="dashboard"
                    element={
                        user?.role === "HOST"
                            ? <HostDashboard />
                            : <Dashboard />
                    }
                />

                <Route path="profile"        element={<Profile />} />
                <Route path="team"           element={<TeamPage />} />
                <Route path="team/create"    element={<CreateTeamPage />} />
                <Route path="players"        element={<PlayersPage />} />
                <Route path="players/:username" element={<PlayerProfilePage />} />
                <Route path="settings"       element={<SettingsPage />} />
                <Route path="leaderboard"    element={<LeaderboardPage />} />
                <Route path="tournaments"    element={<TournamentPage />} />
                <Route path="tournaments/:id" element={<TournamentDetailsPage />} />
            </Route>

            {/* ══════════════════════════════════════
                HOST LAYOUT  (HostLayout + HostSidebar)
                ALL host routes use /host/* prefix so
                they NEVER conflict with MainLayout routes
                ══════════════════════════════════════ */}
            <Route
                element={
                    <ProtectedRoute>
                        <HostRoute>
                            <HostLayout />
                        </HostRoute>
                    </ProtectedRoute>
                }
            >
                {/* Host core pages */}
                <Route path="host"                          element={<HostDashboard />} />
                <Route path="host/tournaments"              element={<HostTournamentsPage />} />
                <Route path="host/tournaments/:id"          element={<HostTournamentDetailsPage />} />
                <Route path="host/tournaments/:id/bracket"  element={<HostBracketPage />} />
                <Route path="host/create-tournament"        element={<CreateTournamentPage />} />

                {/* Shared pages — accessed from HostSidebar via /host/* paths */}
                <Route path="host/players"                  element={<PlayersPage />} />
                <Route path="host/players/:username"        element={<PlayerProfilePage />} />
                <Route path="host/leaderboard"              element={<LeaderboardPage />} />
                <Route path="host/settings"                 element={<SettingsPage />} />
                <Route path="host/browse-tournaments"       element={<TournamentPage />} />
                <Route path="host/browse-tournaments/:id"   element={<TournamentDetailsPage />} />
            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}