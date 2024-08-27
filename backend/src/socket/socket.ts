import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173'

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: URL,
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

const onlineUsers = new Map<string, string>();
const onlineUserId = new Set<string>();


io.on('connection', (socket) => {
    console.log('a user connected with socket id: ', socket.id)

    socket.on('user-online', (userId: string) => {
        onlineUsers.set(socket.id, userId);
        onlineUserId.add(userId);
        io.emit('online-status-update', userId);
        console.log(`${userId} is online.`);
        console.log(onlineUserId)
        for (const [socketId, userId] of onlineUsers) {
            console.log(`Socket ID: ${socketId}, User ID: ${userId}`);
        }
    })

    socket.on('disconnect', () => {
        console.log(socket.id)
        const userId = onlineUsers.get(socket.id);
        if (!userId) {
            console.log(`Attempted to disconnect ${userId} when not in Online Map`)
        } else {
            console.log("userId", userId)
            onlineUsers.delete(socket.id);
            onlineUserId.delete(userId);
            io.emit('disconnected-status-update', userId);
            console.log(`${userId} is disconnected.`);
        }
    })

    socket.on('check-user-status', (userId, callback) => {
        console.log("check-user-status data:", userId)

        // // Perform logic here
        const isOnline = onlineUserId.has(userId);
        console.log("user with id: " + userId + " is " + isOnline)

        callback(isOnline);
        
    })

})


export { server, app }