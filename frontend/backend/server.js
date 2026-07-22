import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import scanRoutes from "./routes/scanRoutes.js";
import { startScheduler } from "./scanner/scanScheduler.js";

import connectDB from "./config/db.js";
import copilotRoutes from "./routes/copilotRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import monitoringRoutes from "./routes/monitoringRoutes.js";

import { initializeSocket } from "./socket.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

initializeSocket(server);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/copilot", copilotRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Vigilia AI Backend Running",
    version: "1.0.0",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "Healthy",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("=================================");
  console.log("🛡️ Vigilia AI Backend Started");
  console.log(`🚀 Server Running : http://localhost:${PORT}`);
  console.log("⚡ Socket.IO Enabled");
  startScheduler();
  console.log("=================================");
});