import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadLog } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("logFile"),
  uploadLog
);

export default router; 