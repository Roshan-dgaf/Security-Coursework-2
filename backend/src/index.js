import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config";
import express from 'express';
import helmet from 'helmet';
import { dirname } from "path";
import { fileURLToPath } from "url";
import connect from './database/connect.js';
import error from './middleware/error.js';
import { generalLimiter } from './middleware/ratelimiter.js';
import adminRoutes from './routes/admin.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import clothesRoutes from './routes/clothes.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import userRoutes from './routes/user.routes.js';
import { PORT } from './utils/constants/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    hsts: false, // HSTS not needed on localhost
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Changed from https to http
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(cookieParser());

app.use(generalLimiter);
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/clothes", clothesRoutes)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/order", orderRoutes)
app.use("/api/v1/upload", uploadRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/admin", adminRoutes)
// Error handler
app.use(error);

// Start server with HTTP instead of HTTPS
app.listen(PORT, async () => {
  console.log(`App is running on http://localhost:${PORT}`);
  connect();
});
