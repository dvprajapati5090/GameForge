import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: process.env.CLIENT_URL,

            credentials: true

        }

    });

    io.on("connection", (socket) => {

        console.log(`🟢 Connected: ${socket.id}`);

        socket.on("join", (userId) => {

            socket.join(userId);

            console.log(`👤 ${userId} joined personal room`);

        });

        socket.on("disconnect", () => {

            console.log(`🔴 Disconnected: ${socket.id}`);

        });

    });

};

export const getIO = () => io;

export const emitTeamUpdated = (userIds) => {

    const io = getIO();

    if (!io) {
        return;
    }

    const uniqueUsers = [
        ...new Set(
            userIds
                .filter(Boolean)
                .map(id => id.toString())
        )
    ];

    for (const userId of uniqueUsers) {

        io.to(userId).emit("teamUpdated");

    }

};

export const emitTournamentUpdated = () => {

    const io = getIO();

    if (!io) return;

    io.emit("tournamentUpdated");

};

export const emitBracketUpdated = () => {

    const io = getIO();

    if (!io) return;

    io.emit("bracketUpdated");

};