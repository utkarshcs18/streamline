import rateLimit from "express-rate-limit";

export const joinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 waitlist join attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Too many attempts from this IP. Please try again after 15 minutes.",
  },
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // 120 general requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Rate limit exceeded. Please slow down.",
  },
});
