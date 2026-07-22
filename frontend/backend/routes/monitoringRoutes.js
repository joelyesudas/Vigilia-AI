import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMonitoringOverview } from "../controllers/monitoringController.js";

const router = express.Router();

router.get("/overview", protect, getMonitoringOverview);

export default router;