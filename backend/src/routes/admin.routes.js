import express from "express";
import { createAdminController } from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

// Create admin account (for development only)
adminRoutes.post("/create", createAdminController);

export default adminRoutes; 