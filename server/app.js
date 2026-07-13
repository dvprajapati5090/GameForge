import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import teamRoutes from "./routes/team.routes.js";
import tournamentRoutes from "./routes/tournament.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/team",teamRoutes);
app.use("/api/tournaments",tournamentRoutes);

// Global Error Handler (Always Last)
app.use(errorHandler);

export default app;