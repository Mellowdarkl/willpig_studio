import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// =========================
// RUTAS DE REGISTRO
// =========================

// Mostrar formulario de registro
router.get("/register", (req, res) => {
  res.render("register", { user: registerUser });
});

// Procesar datos del registro
router.post("/register", async (req, res) => {
  try {
    const newUser = await registerUser(req.body); // llamamos a tu función del controller
    res.redirect("/login"); // después de registrar, vamos al login
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
  res.render("login", { user: loginUser });
});

// Procesar login
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body); // llamamos a tu función del controller
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
