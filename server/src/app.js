import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import adminMediaRoutes from "./routes/admin.media.routes.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// json file
app.use(express.json({ limit: "16kb" }));

// url data
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// static files
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/auth", authRoutes);
app.use("/admin-media", adminMediaRoutes);

export { app };
