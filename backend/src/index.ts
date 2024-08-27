import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./socket/socket";
import cors from "cors"

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)



server.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})