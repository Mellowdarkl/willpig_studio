import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// =========================
// RUTAS DE REGISTRO
// =========================

// Mostrar formulario de registro
router.get("/register", (req, res) => {
  res.render("register"); // Renderiza la vista register
});

// Procesar datos del registro
router.post("/register", async (req, res) => {
  try {
    await registerUser(req.body); // Crear usuario en DB
    res.redirect("/login");       // Redirigir a login
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
  res.render("login"); // Renderiza la vista login
});

// Procesar login
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body); // Verificar usuario
    if (user) {
      res.send("¡Login exitoso!");
    } else {
      res.status(401).send("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al iniciar sesión");
  }
});

export default router;
