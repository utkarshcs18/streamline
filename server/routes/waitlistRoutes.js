import { Router } from "express";
import {
  joinWaitlist,
  getWaitlistCount,
  getHealth,
} from "../controllers/waitlistController.js";
import { joinLimiter, apiLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Route: Register new waitlist member
router.post("/join", joinLimiter, joinWaitlist);

// Route: Retrieve live count of enrolled researchers
router.get("/count", apiLimiter, getWaitlistCount);

// Route: Backend & MongoDB health status
router.get("/health", apiLimiter, getHealth);

export default router;
