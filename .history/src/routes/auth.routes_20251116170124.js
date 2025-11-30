// src/routes/auth.routes.js
import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

// Ruta del formulario
router.post("/register", registerUser);

export default router;
