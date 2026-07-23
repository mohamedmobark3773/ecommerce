//src/utils/socket.js

import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const users = {};
const connections = {};

export const setupSocket = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        const token = socket.handshake.auth.token;
        if (!token) return socket.disconnect();

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return socket.disconnect();

            users[socket.id] = user.id;
            connections[user.id] = socket;

            socket.on("disconnect", () => {
                delete users[socket.id];
                delete connections[user.id];
            });
        });
    });

    return { server, io };
};

export const notifyUser = (userId, event, data) => {
    const socket = connections[userId];
    if (socket) socket.emit(event, data);
};