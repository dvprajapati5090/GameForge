import AppRoutes from "./routes/AppRoutes";
import useAuth from "./hooks/useAuth";

export default function App() {

    const loading = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-cyan-400 text-xl font-semibold">
                    Restoring Session...
                </div>
            </div>
        );
    }

    return <AppRoutes />;
}