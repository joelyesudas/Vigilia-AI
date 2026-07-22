import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

import {
  uploadLog,
  getLogs,
} from "../controllers/logController.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("log"),
  uploadLog
);

router.get("/", protect, getLogs);

export default router;