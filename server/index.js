import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import waitlistRoutes from "./routes/waitlistRoutes.js";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const WEB_ORIGIN = process.env.WEB_ORIGIN || "http://localhost:3000";

// Connect to MongoDB
connectDB();

// Security and utility middleware
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: [
      WEB_ORIGIN,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Mount MVC API routes under /api
app.use("/api", waitlistRoutes);

// Root informational endpoint
app.get("/", (_req, res) => {
  res.json({
    name: "Streamline API",
    status: "online",
    architecture: "MVC",
    endpoints: ["POST /api/join", "GET /api/count", "GET /api/health"],
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled server error:", err);
  res.status(err.status || 500).json({
    ok: false,
    error: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [Streamline API] Running on http://localhost:${PORT}`);
  console.log(`📁 [Architecture] Express + Mongoose (MVC)`);
});

export default app;
