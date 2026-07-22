import express from "express";

import {
  getLatestScan,
  getScanHistory,
  runManualScan,
} from "../controllers/scanController.js";

const router = express.Router();

router.get("/latest", getLatestScan);

router.get("/history", getScanHistory);

router.post("/manual", runManualScan);

export default router;