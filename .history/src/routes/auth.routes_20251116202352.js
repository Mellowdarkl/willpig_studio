import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Mostrar formulario de registro
router.get("/register", (req, res) => {
    res.render("register");
});

// Procesar formulario
router.post("/register", registerUser);

export default router;
