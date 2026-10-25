import express from "express";
import { chatWithCopilot } from "../controllers/copilotController.js";
import { investigateWithAgent } from "../controllers/agentController.js";

const router = express.Router();

router.post("/chat", chatWithCopilot);
router.post("/investigate", investigateWithAgent);

export default router;
