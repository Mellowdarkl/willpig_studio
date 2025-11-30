import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Mostrar formulario de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// Procesar registro
router.post("/register", async (req, res) => {
  try {
    await registerUser(req.body);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
  }
});

// Mostrar formulario de login
router.get("/login", (req, res) => {
  res.render("login");
});

// Procesar login
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    if (user) {
      res.send(`¡Bienvenido ${user.nombre}!`);
    } else {
      res.status(401).send("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al iniciar sesión");
  }
});

export default router;
