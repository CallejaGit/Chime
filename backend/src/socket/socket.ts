// import { createServer } from "node:http";
// import express from "express";
// import { Server } from "socket.io";

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173'

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: URL,
//         methods: ['GET', 'POST'],
//         credentials: true,
//     }
// });


// const onlineUsers = new Map<string, string>();

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id)

//     socket.on('user connected', (userId: string) => {
//         onlineUsers.set(socket.id, userId);
//         io.emit('updated online users', Array.from(onlineUsers.values()));
//         console.log(`${userId} is online.`);
//     })

//     socket.on('disconnect', () => {
//         const userId = onlineUsers.get(socket.id);
//         onlineUsers.delete(socket.id);
//         io.emit('update online users', Array.from(onlineUsers.values()));
//         console.log(`${userId} is disconnected.`);
//     })

// })


// export { server, app }
