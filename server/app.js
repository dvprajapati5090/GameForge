import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import teamRoutes from "./routes/team.routes.js";
import tournamentRoutes from "./routes/tournament.routes.js";
import playerRoutes from "./routes/player.routes.js";
import matchRoutes from "./routes/match.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import chatRoutes from "./routes/chat.routes.js";

import googleRoutes from "./routes/google.routes.js";

import paymentRoutes from "./routes/payment.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middleware
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. mobile apps, curl)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            callback(new Error(`CORS: Origin ${origin} not allowed`));
        },
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
app.use("/api/players",playerRoutes);
app.use("/api/matches",matchRoutes);
app.use("/api/notifications",notificationRoutes);

app.use("/api/team-chat",chatRoutes);

app.use("/api/auth/google",googleRoutes);

app.use("/api/payments",paymentRoutes);

// 404 catch-all — must be before global error handler
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler (Always Last)
app.use(errorHandler);

export default app;