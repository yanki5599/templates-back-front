import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter";
import usersRouter from "./routes/usersRouter";
import authMiddleware from "./middleware/authMiddleware";

import { errorMiddleware } from "./middleware/errorHandler";
import { connectDB } from "./config/db";
// import { initializeSocketServer } from "./socketServer";

dotenv.config();

connectDB(); // connect to mongoDB
const app = express();

const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // change this to your frontend domain
    credentials: true, // Required for cookies
  })
);

// Initialize Socket.IO
// export const io = initializeSocketServer(httpServer);

// Routes
app.use("/", authRouter);
app.use(authMiddleware);

app.use("/users", usersRouter);

// Basic error handling
app.use(errorMiddleware);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
