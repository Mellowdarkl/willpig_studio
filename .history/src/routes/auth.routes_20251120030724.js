import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

// =========================
// RUTAS DE REGISTRO
// =========================

// Mostrar formulario de registro
router.get("/register", (req, res) => {
  res.render("register"); // Renderiza tu vista register
});

// Procesar datos del registro
router.post("/register", async (req, res) => {
  try {
    // Llamamos a la función del controller para crear el usuario en la DB
    await registerUser(req.body);

    // Después de registrar, redirigimos al login
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
  }
});

// =========================
// RUTAS DE LOGIN
// =========================

// Mostrar formulario de login
router.get("/login", (req, res) => {
  res.render("login"); // Renderiza tu vista login
});

export default router;
